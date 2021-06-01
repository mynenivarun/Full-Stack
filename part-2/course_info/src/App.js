import React from "react";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </>
    );
  };
  


  const Course = ({ courses }) => {
    return (
      <>
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
          );
        })}
      </>
    );
  };
  
 

  const Header = ({ course }) => {
    return <h2>{course}</h2>;
  };
  
 

  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };
  
  

  const Total = ({ parts }) => {
    const arr = parts.map((part) => part.exercises);
    const total = arr.reduce((res, current) => res + current);
    return <p style={{ fontWeight: "bold" }}>Number of exercises {total}</p>;
  };
  
  

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Course courses={courses} />
    </div>
  );
};

export default App;