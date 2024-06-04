import React, { useState } from 'react';
import './NewGoalPage.css';

const GoalPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    from: '',
    to: '',
    role: '',
    description: '',
  });

  const kpiList = [
    { id: 1, name: 'KPI 1' },
    { id: 2, name: 'KPI 2' },
    { id: 3, name: 'KPI 3' },
    // Thêm dữ liệu KPI tương ứng vào đây
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="goal-container">
        <h2>New Goal</h2>
        <div className="row">
          <div className="column">
            <h3>Goal information</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="required">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="from" className="required">From</label>
                <input
                  type="datetime-local"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="to" className="required">To</label>
                <input
                  type="datetime-local"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="kpis">
        <h3>KPIs</h3>
        <div className="kpiList">
          {kpiList.map(kpi => (
            <div className="kpiItem" key={kpi.id}>
              <div className="widget">
                <div className="icon">🔑</div>
                <div className="name">{kpi.name}</div>
              </div>
            </div>
          ))}
          <button type="submit">New KPI</button>
        </div>
      </div>
    </div>


  );
};

export default GoalPage;
