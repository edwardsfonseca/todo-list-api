import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



const Home = () => {
	const [obtener, setObtener] = useState([]);
	const [index, setIndex] = useState("");
	const [todoEditing, setTodoEditing] = useState(null);
	const [editingtext, setEditingText]=useState("");
	// aca lo lo actulizamos
	useEffect(() => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Edwards-Fonseca", requestOptions)
			.then(response => response.json())
			.then(result => setObtener(result))
			.catch(error => console.log('error', error));
	}, [])
	// aca lo agregamos 
	function addTask() {
		let recibe = [...obtener, {
			"label": index,
			"done": false}]
			setObtener(recibe)
			
		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body:JSON.stringify(recibe),
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Edwards-Fonseca", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	const Submit = (e) => {
		e.preventDefault(); // no permite que se actualize la pagina
		setIndex(""); // llama a la function
	};
	// aca lo removemos
	function removeTask(i) {
		let borrar =obtener.filter((todo, index) => index !== i)
		setObtener(borrar);
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify(borrar),
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Edwards-Fonseca", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}
	function editTask(id) {
		setTodoEditing(id)
		const updatedTodo = [...obtener].map((todo,i)=>{
			if(i === id){
			  todo = index;
			}
			return todo;
		  });
		
		setObtener(updatedTodo)
		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body:JSON.stringify(updatedTodo),
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Edwards-Fonseca", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	return (


		<div className="text-center">

			<h1 className="text-center mt-5">Todo List</h1>


			<form className="formulario" onSubmit={Submit}>
				<div className="container">
				<input 
					className="formulario-input"
					value={index}
					placeholder="Agrega tu tarea"
					onChange={(e) => setIndex(e.target.value)}></input>
				
				<button 
				className=" btn" 
				onClick={() => {addTask();}}
				>tarea</button>
				</div>
				
					{obtener?.map((valor, i) => {
				
						return <span className="coco" key={i}>
							{todoEditing===i
						?
						(<input 
						type="text" 
						onChange={(e)=> setEditingText(e.target.value) }
						value={editingtext}/>)
						:
						(<li>{valor.label}</li>)}
						
						
						
						<i onClick={() => {removeTask(i);}} 
						className="fas fa-trash-alt"></i>
						
						<i onClick={() => {editTask(i);}} 
						className="fas fa-edit"></i>
						</span>;
						
						
					})}
			<button className="contador"style={{"--clr":"#1e9bff"}} type="button" ><span><i></i>{obtener.length}</span></button>
			</form>
				

		</div>
	);
};

export default Home;
