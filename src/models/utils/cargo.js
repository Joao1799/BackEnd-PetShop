import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createCargo = async (request, response) => {
    try {
        const { nome, ativo } = request.body;
        const cargoExist = await prisma.cargo.findFirst({
            where: {
                OR: [
                    { nome: nome }, // Verifica se já existe 
                ]
            }
        });
        if (cargoExist) {
            return response.status(422).json({ msg: 'Cargo já cadastrado' })
        }

        const newCargo = await prisma.Cargo.create({
            data: {
                nome,
                ativo
            }
        });

        return response.status(201).json({ msg: "Cargo criado com sucesso!", cargo: newCargo });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Erro ao criar cargo." });
    }
};

const getAllCargos = async (request, response) => {
    try {
        const cargos = await prisma.cargo.findMany({});

        response.status(200).json(cargos);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao buscar cargos' });
    }
};

const updateCargo = async (request, response) => {
    try {
        const cargoAtualizado = await prisma.cargo.update({
            where: {
                id: request.body.id
            },
            data: {
                nome: request.body.nome,
                ativo: request.body.ativo
            }
        });

        return response.status(200).json({
            msg: "Cargo editado com sucesso!",
            cargo: cargoAtualizado
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao editar Cargo' });
    }
};


const deleteUserFunc = async (request, response) => {
    try {
        await prisma.userFunc.delete({
            where: {
                id: request.params.id
            }
        })
        response.status(204).json({msg: "Usuário excluido com sucesso!"})
    } catch {
        response.status(500).json({ error: 'Erro ao excluir usuário' });
    }
}

export default {
    createCargo,
    getAllCargos,
    updateCargo,
    deleteUserFunc,
};
