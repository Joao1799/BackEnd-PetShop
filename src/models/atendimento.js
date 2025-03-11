import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createAtendimento = async (request, response) => {
	try {
		// Pegando os valores do corpo da requisição
		const { userId, petId, funcionarioId, tipo, dataHora } = request.body;

		// Validando se todos os campos obrigatórios foram enviados
		if (!userId || !petId || !funcionarioId) {
			return response.status(400).json({ error: "Os campos userId, petId e funcionarioId são obrigatórios" });
		}

		// Valida se os IDs existem no banco
		const userExists = await prisma.UserClient.findUnique({ where: { id: userId } });
		const petExists = await prisma.Pet.findUnique({ where: { id: petId } });
		const funcionarioExists = await prisma.UserFunc.findUnique({ where: { id: funcionarioId } });

		if (!userExists) {
			return response.status(400).json({ error: `Usuário com ID ${userId} não encontrado.` });
		}
		if (!petExists) {
			return response.status(400).json({ error: `Pet com ID ${petId} não encontrado.` });
		}
		if (!funcionarioExists) {
			return response.status(400).json({ error: `Funcionário com ID ${funcionarioId} não encontrado.` });
		}

		const newAtendimento = await prisma.Atendimento.create({
			data: {
				tipo,
				dataHora: new Date(dataHora),
				atendido: false,
				userId,
				petId,
				funcionarioId,
			},
		});

		console.log("Atendimento criado:", newAtendimento);
		response.status(201).json(newAtendimento);
	} catch (error) {
		console.error("Erro ao criar atendimento:", error);
		return response.status(500).json({ error: "Erro ao criar atendimento" });
	}
};

const getAllAtendimentos = async (request, response) => {
	try {
		//buscar os dados no banco de dados
		const atendimentos = await prisma.Atendimento.findMany({
			include: {
				user: true,
				pet: true,
				funcionario: true,
			},
		});
		//removo os campos do objt principal
		const atendimentosFilter = atendimentos.map(({senha, userId, petId, funcionarioId, ...rest}) =>({
			...rest,
			//fitro os campos dos Objetos Aninhados
			user:{
				email: rest.user.email,
				CPF: rest.user.CPF,
				telefone: rest.user.telefone,
			},
			pet:{
				id: rest.pet.id,
				name: rest.pet.name,
				breed: rest.pet.breed,
				species: rest.pet.species,
			},
			funcionario:{
				id: rest.funcionario.id,
				email: rest.funcionario.email,
				CPF: rest.funcionario.CPF,
				name: rest.funcionario.name,
				cargo: rest.funcionario.cargo,
			}
		}))
		
		response.status(200).json(atendimentosFilter);
	} catch (error) {
		console.error('Erro ao buscar atendimentos:', error);
		return response.status(500).json({ error: 'Erro ao buscar atendimentos' });
	}
};

const updateAtendimento = async (request, response) => {
	try {
		const atendimento = await prisma.Atendimento.update({
			where: {
				id: request.body.id,
			},
			data: {
				tipo: request.body.tipo,
				atendido: request.body.atendido,
				dataHora: new Date(request.body.dataHora),
			},
		});
		response.status(201).json(atendimento);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao atualizar atendimento' });
	}
};

const deleteAtendimento = async (request, response) => {
	try {
		await prisma.Atendimento.delete({
			where: {
				id: request.body.id,
			},
		});
		response.status(204).send({ msg: 'Sucessor ao excluir atendimento' });
	} catch (error) {
		response.status(500).json({ error: 'Erro ao excluir atendimento' });
	}
};

export default {
	createAtendimento,
	getAllAtendimentos,
	updateAtendimento,
	deleteAtendimento,
};