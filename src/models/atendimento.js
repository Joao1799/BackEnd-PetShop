import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

const createAtendimento = async (request, response) => {
	// vindo da URL
	try {
	  const data = {
		tipo: request.body.tipo,
		dataHora: new Date(request.body.dataHora), 
		atendido: false,
		userId, 
		petId,  
	  };
  
	  const newAtendimento = await prisma.atendimento.create({ data });
	  console.log(newAtendimento)
	  response.status(201).json(newAtendimento);
	} catch (error) {
	  response.status(500).json({ error: 'Erro ao criar atendimento' });
	  console.log(response)
	}
};

  const getAllAtendimentos = async (request, response) => {
	try {
	  const atendimentos = await prisma.atendimento.findMany({
		include: {
		  user: true,
		  pet: true,
		},
	  });
	  response.status(200).json(atendimentos);
	} catch (error) {
	  response.status(500).json({ error: 'Erro ao buscar atendimentos' });
	}
};

  const updateAtendimento = async (request, response) => {
	try {
	  const atendimento = await prisma.atendimento.update({
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
	  await prisma.atendimento.delete({
		where: {
		  id: request.params.id,
		},
	  });
	  response.status(204).send();
	} catch (error) {
	  response.status(500).json({ error: 'Erro ao excluir atendimento' });
	}
};

export default{
	createAtendimento,
	getAllAtendimentos,
	updateAtendimento,
	deleteAtendimento,
  };