import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = async(request, response) =>{
	try{
		const data = {
			ownerName:request.body.ownerName,
			email:request.body.email,
			};
			const newUser = await prisma.user.create({data})
			response.status(201).json(newUser)
			console.log(newUser);
	}catch(error){
			response.status(500).json({ error: 'Erro ao criar usuários' });
	}
};

const getAllUsers = async (request, response) => {
	try {
	  const users = await prisma.user.findMany({
		include: {
		  pets: true, 
		  atendimentos: true, 
		},
	  });
  
	  response.status(200).json(users);
	  console.log(users);
	} catch (error) {
	  response.status(500).json({ error: 'Erro ao buscar usuários' });
	}
  };

const updateUser = async(request, response) =>{
	try{
		await prisma.user.update({
			where:{
				id:request.params.id
			},
			data: {
				ownerName:request.body.ownerName,
				email:request.body.email,
				atendimento:request.body.atendimento
			}
		})
		response.status(201).json(request.body)
	}catch(error){
		response.status(500).json({ error: 'Erro ao editar usuário' });
	}
}

const deleteUser = async(request, response) =>{
	try{
		await prisma.user.delete({
			where:{
				id:request.params.id
			}
		})
		response.status(204).json(request.body)
	}catch{
		response.status(500).json({ error: 'Erro ao excluir usuário' });
	}
}

export default {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser,
};
