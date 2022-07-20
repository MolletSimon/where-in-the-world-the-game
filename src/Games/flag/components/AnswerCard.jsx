export function AnswerCard(props) {
  return (
    <>
      {props.submitted ? (
        <div
          style={{
            background: props.p.right ? "#3AB795" : "white",
            color: props.p.right ? "white" : "red",
          }}
          className={`border-2 p-4 w-full rounded-2xl mb-4 cursor-pointer 
                        flex justify-center items-center h-full"
                        }`}
        >
          {props.p.value}
        </div>
      ) : (
        <div
          onClick={() => props.select(props.index)}
          style={{
            background: props.index === props.selected ? "#0E94D7" : "white",
            color: props.index === props.selected ? "white" : "black",
          }}
          className={`border-2 p-4 w-full rounded-2xl mb-4 cursor-pointer 
                        flex justify-center items-center h-full"
                        }`}
          key={"nsubmitted" + props.index}
        >
          {props.p.value}
        </div>
      )}
    </>
  );
}
