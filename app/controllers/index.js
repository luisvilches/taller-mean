var socket = io.connect( 'http://localhost:8000');

exports = angular.module('controllers',[])

.controller('main', function($scope,$http){


	// se consoltan todos los registros y se muestran en el home
	$http({method:'get', url:'/all'})
	.then(function(data){
		$scope.tareas = data.data;
		console.log(data.data);
	},function(err){
		if (err) {console.log(err)}
	})

	// se crea la funcion delete, para eliminar un registro
	$scope.delete = function(id){
		$http({method:"delete", url:"/delete/"+id})
		.then(function(data){
			console.log(data)
		})
	}
	//se crea la funcion mod, para solictar losdatos de un registo por su id
	$scope.mod = function(id){
		$http({method:"get", url:"/edit/"+id})
		.then(function(data){
			$scope.modtarea = data.data;
			console.log(data.data);
		},function(err){
			console.log(err)
		})
	}
	//actualizamos el registro con los datos modificados
	$scope.update = function(id,tarea){
		console.log(tarea);

		if (tarea != "" && tarea != null) {
			$http.put('/update/' + id, {name: tarea})
			.then(function(){
				tarea = "";
			})
			.catch(function(err){
				console.log(err)
			})
		}else{
			alert('datos incorrectos')
		}
	}

	//socket a la escucha

	socket.on('update', function(){
		$http({method:'get', url:'/all'})
		.then(function(data){
			$scope.tareas = data.data;
			console.log(data.data);
		},function(err){
			if (err) {console.log(err)}
		})
	})
})
.controller('add', function($scope,$http){

	$scope.add = function(tarea){

		var formData = {};

		if (tarea != "" && tarea != null) {
			formData = {
				name: tarea
			}

			$http.post('/add', formData)
			.then(function(){
				tarea = "";
			})
			.catch(function(err){
				console.log(err)
			})


		}else{
			alert('datos incorrectos')
		}
	}
})
.controller('edit', function(){})