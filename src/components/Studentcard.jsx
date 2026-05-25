

function StudentCard(props) {

  return (
    <div style={{
      border: "2px solid blue",
      padding: "10px",
      margin: "10px",
      width: "250px"
    }}>
      
      <h2>Name: {props.name}</h2>
      <h3>Marks: {props.marks}</h3>
      <h4>Course: {props.course}</h4>

    </div>
  );
}

export default StudentCard;