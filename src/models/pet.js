import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createpet = async (request, response) => {
	try {
		console.log("Corpo da requisição:", request.body);
		console.log("UserID recebido na URL:", request.body.ownerId);

		const {name, breed, species, age, ownerId} = request.body;
		const newPet = await prisma.Pet.create({
			data : {
				name,
				breed,
				species,
				age,
				ownerId:ownerId,
			}
		});

		response.status(201).json(newPet)
	} catch (error) {
		response.status(500).json({ error: request.body });
	}
};

const getAllpet = async (request, response) => {
	try {
		const pets = await prisma.Pet.findMany({
			include: {
				owner: true
			},
		});
		response.status(200).json(pets);
	} catch (error) {
		console.error("Erro ao buscar pets:", error);
		response.status(500).json({ error: 'Erro ao buscar pets' });
	}
}

const updatepet = async (request, response) => {
	try {
		const updatedPet = await prisma.Pet.update({
			where: {
				id: request.body.id,
			},
			data: {
				name: request.body.name,
				breed: request.body.breed,
				age: request.body.age,
				ownerId: request.params.userId,
			},
		});
		response.status(201).json({msg: "PET editado com sucesso!",updatedPet});
	} catch (error) {
		response.status(500).json({ error: 'Erro ao editar PET' });
	}
}

const deletepet = async (request, response) => {
	try {
		await prisma.Pet.delete({
			where: {
				id: request.body.id
			}
		})
		response.status(204).json({msg: 'Sucesso ao excluir PET'})
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

