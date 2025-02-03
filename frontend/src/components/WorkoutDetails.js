import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatedWorkout = { title, load, reps };

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedWorkout)
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: data });
      setEditing(false);
    }
  };

  return (
    <div className="workout-details">
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={handleDelete}>🗑️</span>
          <button onClick={() => setEditing(true)}>Edit ✏️</button>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
