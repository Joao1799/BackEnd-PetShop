import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createAtendimento = async (request, response) => {

	try {
		// Pegando os valores da URL
		const { userId, petId } = request.params;

		// Pegando os valores do corpo da requisição
		const { tipo, dataHora, funcionarioId } = request.body;

		if (!userId || !petId || !funcionarioId) {
			return response.status(400).json({ error: 'Os campos userId, petId e funcionarioId são obrigatórios' });
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

		console.log(newAtendimento)
		response.status(201).json(newAtendimento);
	} catch (error) {
		console.error('Erro ao criar atendimento:', error);
		return response.status(500).json({ error: 'Erro ao criar atendimento' });
	}
};

const getAllAtendimentos = async (request, response) => {
	try {
		const atendimentos = await prisma.Atendimento.findMany({
			include: {
				user: true,
				pet: true,
				funcionario: true,
			},
		});
		response.status(200).json(atendimentos);
	} catch (error) {
		console.error('Erro ao buscar atendimentos:', error);
		return response.status(500).json({ error: 'Erro ao buscar atendimentos' });
	}
};

const updateAtendimento = async (request, response) => {
	try {
		const atendimento = await prisma.Atendimento.update({
			where: {
				id: request.params.id,
			},
			data: {
				tipo: request.body.tipo,
				dataHora: new Date(request.body.dataHora),
				atendido: request.body.atendido,
				userId: request.body.userId,
				petId: request.body.petId,
			},
		});
		response.status(200).json(atendimento);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao atualizar atendimento' });
	}
};

const deleteAtendimento = async (request, response) => {
	try {
		await prisma.Atendimento.delete({
			where: {
				id: request.params.id,
			},
		});
		response.status(204).send();
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