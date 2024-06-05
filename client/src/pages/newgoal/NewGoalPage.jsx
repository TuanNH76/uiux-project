import React, { useState } from 'react';
import './NewGoalPage.css';

const KPI_TYPE = {
  TODO_KPI: 'TODO_KPI',
  QUANTITY_KPI: 'QUANTITY_KPI',
  WEIGHTED_KPI: 'WEIGHTED_KPI'
};

const generateId = () => Math.floor(Math.random() * 800) + 200;

const NewGoalPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    from: '',
    to: '',
    role: '',
    description: '',
  });

  const [kpiList, setKpiList] = useState([]);
  const [newKpi, setNewKpi] = useState({
    name: '',
    typeKPI: '',
    completed: false,
    from: '',
    to: '',
    numberOfOptionalsToDo: '',
    target: '',
    unit: '',
    duration: '',
    split: '',
    tasks: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKpiChange = (e) => {
    const { name, value } = e.target;
    setNewKpi({
      ...newKpi,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    setNewKpi({
      ...newKpi,
      tasks: [
        ...newKpi.tasks,
        { id: `T${generateId()}`, name: '', completed: false, type: '', from: '', to: '', link: '' }
      ]
    });
  };

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const tasks = [...newKpi.tasks];
    tasks[index][name] = value;
    setNewKpi({
      ...newKpi,
      tasks
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.from && formData.to) {
      const newGoal = { ...formData, kpiList };
      const goalData = JSON.parse(localStorage.getItem('goalData')) || [];
      goalData.push(newGoal);
      localStorage.setItem('goalData', JSON.stringify(goalData));
      console.log('Goal saved to localStorage:', newGoal);
      alert('Goal has been saved successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleAddKpi = () => {
    setKpiList([...kpiList, { ...newKpi, id: `K${generateId()}`, score: 0 }]);
    setNewKpi({
      name: '',
      typeKPI: '',
      completed: false,
      from: '',
      to: '',
      numberOfOptionalsToDo: '',
      target: '',
      unit: '',
      duration: '',
      split: '',
      tasks: []
    });
  };

  return (
    <div className='container'>
      <div className="newGoal-container">
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
          </div>
        </div>
      </div>
      <div className="newKPI">
        <div className='kpi-container'>
          <h3>New KPI</h3>
          <form>
            <div>
              <label htmlFor="kpiName" className="required">KPI Name</label>
              <input
                type="text"
                id="kpiName"
                name="name"
                value={newKpi.name}
                onChange={handleKpiChange}
                required
              />
            </div>
            <div>
              <label htmlFor="typeKPI" className="required">KPI Type</label>
              <select
                id="typeKPI"
                name="typeKPI"
                value={newKpi.typeKPI}
                onChange={handleKpiChange}
                required
              >
                <option value="">Select KPI Type</option>
                <option value={KPI_TYPE.TODO_KPI}>TODO KPI</option>
                <option value={KPI_TYPE.QUANTITY_KPI}>Quantity KPI</option>
                <option value={KPI_TYPE.WEIGHTED_KPI}>Weighted KPI</option>
              </select>
            </div>
            {newKpi.typeKPI === KPI_TYPE.TODO_KPI && (
              <div>
                <label htmlFor="numberOfOptionalsToDo" className="required">Number of Optionals To Do</label>
                <input
                  type="number"
                  id="numberOfOptionalsToDo"
                  name="numberOfOptionalsToDo"
                  value={newKpi.numberOfOptionalsToDo}
                  onChange={handleKpiChange}
                  required
                />
              </div>
            )}
            {newKpi.typeKPI === KPI_TYPE.QUANTITY_KPI && (
              <>
                <div>
                  <label htmlFor="target" className="required">Target</label>
                  <input
                    type="number"
                    id="target"
                    name="target"
                    value={newKpi.target}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="unit" className="required">Unit</label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={newKpi.unit}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="required">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newKpi.duration}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="split" className="required">Split</label>
                  <input
                    type="text"
                    id="split"
                    name="split"
                    value={newKpi.split}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
              </>
            )}
            {newKpi.typeKPI && (
              <>
                <div>
                  <label htmlFor="from" className="required">From</label>
                  <input
                    type="datetime-local"
                    id="from"
                    name="from"
                    value={newKpi.from}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="to" className="required">To</label>
                  <input
                    type="datetime-local"
                    id="to"
                    name="to"
                    value={newKpi.to}
                    onChange={handleKpiChange}
                    required
                  />
                </div>
              </>
            )}
            <h4>Tasks</h4>
            {newKpi.tasks.map((task, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={`taskName${index}`} className="required">Task Name</label>
                  <input
                    type="text"
                    id={`taskName${index}`}
                    name="name"
                    value={task.name}
                    onChange={(e) => handleTaskChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`taskFrom${index}`} className="required">From</label>
                  <input
                    type="datetime-local"
                    id={`taskFrom${index}`}
                    name="from"
                    value={task.from}
                    onChange={(e) => handleTaskChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`taskTo${index}`} className="required">To</label>
                  <input
                    type="datetime-local"
                    id={`taskTo${index}`}
                    name="to"
                    value={task.to}
                    onChange={(e) => handleTaskChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`taskLink${index}`}>Link</label>
                  <input
                    type="text"
                    id={`taskLink${index}`}
                    name="link"
                    value={task.link}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddTask}>Add Task</button>
            <button type="button" onClick={handleAddKpi}>Add KPI</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewGoalPage;
