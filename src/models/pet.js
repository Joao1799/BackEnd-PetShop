import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createpet = async (request, response) => {
	try {
		console.log("Corpo da requisição:", request.body);
		console.log("UserID recebido na URL:", request.body.userId);

		const {name, breed, species, age, owner, ownerId} = request.body;

		const data ={
			name,
			breed,
			species,
			age,
			owner,
			ownerId
		};

		const newPet = await prisma.Pet.create(data)
		response.status(201).json(newPet)
	} catch (error) {
		response.status(500).json({ error: request.body });
	}
};

const getAllpet = async (request, response) => {
	try {
		const pets = await prisma.Pet.findMany({
			include: {
				user: true
			},
		});
		response.status(200).json(pets);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao buscar pets' });
	}
}

const updatepet = async (request, response) => {
	try {
		const updatedPet = await prisma.Pet.update({
			where: {
				id: request.params.id,
			},
			data: {
				name: request.body.name,
				breed: request.body.breed,
				age: request.body.age,
				ownerId: request.params.userId,
			},
		});
		response.status(200).json(updatedPet);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao editar PET' });
	}
}

const deletepet = async (request, response) => {
	try {
		await prisma.Pet.delete({
			where: {
				id: request.params.id
			}
		})
		response.status(204).json()
	} catch {
		response.status(500).json({ error: 'Erro ao excluir PET' });
	}
}

export default {
	createpet,
	getAllpet,
	updatepet,
	deletepet,
};

