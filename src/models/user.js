import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = async (request, response) => {
	try {
		const { email, CPF, telefone, ownerName } = request.body;
		const userExist = await prisma.UserClient.findFirst({
            where: {
                OR: [
                    { CPF: CPF }, // Verifica se já existe 
                    { email: email }
                ]
            }
        });
        if (userExist) {
            return response.status(422).json({ msg: 'CPF/Email já cadastrados' })
        }

		const newUser = await prisma.UserClient.create({
            data: {
                email,
                CPF,
                ownerName,
                telefone
            }
        });

		response.status(201).json(newUser)
		console.log(newUser);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao criar usuários' });
	}
};

const getAllUsers = async (request, response) => {
	try {
		const users = await prisma.UserClient.findMany({
			include: {
				pets: true, 
				atendimentos: true, 
			},
		});
		response.status(200).json(users);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao buscar usuários' });
	}
};

const updateUser = async (request, response) => {
	try {
		await prisma.UserClient.update({
			where: {
				id: request.body.id
			},
			data: {
				ownerName: request.body.ownerName,
				email: request.body.email,
				atendimento: request.body.atendimento,
				telefone: request.body.telefone
			}
		})
		response.status(201).json(request.body)
	} catch (error) {
		response.status(500).json({ error: 'Erro ao editar usuário' });
	}
}

const deleteUser = async (request, response) => {
	try {
		const id = request.params.id;
		if (!id) {
			return response.status(400).json({ error: 'ID inválido' });
		}

		// Excluir pets do usuário primeiro
		await prisma.pet.deleteMany({
			where: {
				ownerId: id
			}
		});

		// Agora excluir o usuário
		await prisma.userClient.delete({
			where: {
				id: id
			}
		});

		response.status(204).send();
	} catch (error) {
		console.error('Erro ao excluir usuário:', error);
		response.status(500).json({ error: 'Erro ao excluir usuário' });
	}
};

export default {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser,
};
