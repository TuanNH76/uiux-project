import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalForm.css';

const GoalForm = ({ goal, onClose, onSave }) => {
  const [name, setName] = useState(goal?.name || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [startDate, setStartDate] = useState(goal?.start_date || '');
  const [endDate, setEndDate] = useState(goal?.end_date || '');
  const [kpis, setKpis] = useState([]);
  const [selectedKpis, setSelectedKpis] = useState(goal?.kpis || []);

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const response = await axios.get('/api/kpis');
      setKpis(response.data);
    } catch (error) {
      console.error('Failed to fetch KPIs', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const goalData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      kpis: selectedKpis
    };

    try {
      if (goal?._id) {
        await axios.put(`/api/goals/${goal._id}`, goalData);
      } else {
        await axios.post('/api/goals', goalData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save goal', error);
    }
  };

  const handleKpiChange = (kpiId) => {
    setSelectedKpis(prevSelectedKpis =>
      prevSelectedKpis.includes(kpiId)
        ? prevSelectedKpis.filter(id => id !== kpiId)
        : [...prevSelectedKpis, kpiId]
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <label>
            KPIs:
            {kpis.map(kpi => (
              <div key={kpi._id}>
                <input
                  type="checkbox"
                  value={kpi._id}
                  checked={selectedKpis.includes(kpi._id)}
                  onChange={() => handleKpiChange(kpi._id)}
                />
                {kpi.name}
              </div>
            ))}
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
