import React, { useState } from "react";
import Counter from "./counter";
const countersList = [
  { id: 1, value: 1 },
  { id: 2, value: 1 },
  { id: 3, value: 0 },
];
function Counters() {
  const [counters, setCounters] = useState(countersList);

  const handleIncrement = (counter) => {
    let attCounters = [...counters];
    const index = attCounters.indexOf(counter);
    counter.value++;
    attCounters[index] = counter;
    setCounters(attCounters);
  };
  const handleDecrement = (counter) => {
    let attCounters = [...counters];
    const index = attCounters.indexOf(counter);
    counter.value--;
    attCounters[index] = counter;
    setCounters(attCounters);
  };
  const handleDelete = (counter) => {
    let attCounters = [...counters];
    const index = attCounters.indexOf(counter);
    attCounters.splice(index, 1);
    setCounters(attCounters);
  };
  return (
    <div className="counters">
      {counters.map((el) => (
        <Counter
          key={el.id}
          counter={el}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Counters;
