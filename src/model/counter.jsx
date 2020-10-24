import React from "react";
function Counter(props) {
  const { value, id } = props.counter;
  const getClass = (value) => {
    let classBtn = "btn btn-secondary";
    if (value === 0) classBtn += "disable";
    return classBtn;
  };
  const isDecrementDisabled = (value) => {
    return value === 0;
  };
  return (
    <div id={id} className="counter">
      <span className="badge badge-sm">{value}</span>
      <button
        className="btn btn-secondary"
        onClick={() => {
          props.onIncrement(props.counter);
        }}
      >
        +
      </button>
      <button
        className={getClass(value)}
        disabled={isDecrementDisabled(value)}
        onClick={() => {
          props.onDecrement(props.counter);
        }}
      >
        -
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.onDelete(props.counter);
        }}
      >
        X
      </button>
    </div>
  );
}

export default Counter;
