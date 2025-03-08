import express from 'express';
import { dataValidation } from '../services/zod';
import { serviceModel } from '../services/service';

const router = express.Router();

router.post('/newService', async (req, res) => {

    const result = dataValidation.safeParse(req.body);

    if(!result.success) {
        res.status(500).json({error: "Dados enviados são inválidos."});
        return;
    }

    try {
        const newService =  new serviceModel(result.data);
        await newService.save();

        res.status(200).json({sucess: "O salvamento ocorreu com sucesso no banco de dados"});
    } catch (error) {
        res.status(500).json({error: "Ocorreu um erro interno para salvar os dados."});
        return;
    }

});

router.get('/getById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) { 
            res.json({error: 'É necessário informar um id'});
            return;
        }

        const getById = await serviceModel.findById(id);

        if(!getById) {
            res.status(404).json({error: `Não encontrei nada com o ID: ${id}`});
            return;
        }

        res.status(200).json(getById);
    } catch(error) {
        res.status(500).json({error: 'Ocorreu um erro durante o processo.'});
    }
});

router.get('/getService', async (req, res) => {
    try {
        const phone = req.query;

        
        if(!phone) {
            res.json({error: 'É necessário informar o telefone.'});
            return;
        }
        
        const consult = await serviceModel.find(phone);

        if(!consult) {
            res.json({error: 'Cliente não encontrado'});
            return;
        }

        res.status(202).json(consult);

    } catch(error) {
        res.status(500).json({error: 'Ocorreu um erro na busca.'});
        return;
    }
});

router.get('/getAllServices', async (req, res) => {
    try {
        const allServices = await serviceModel.find();
    
        if(!allServices) {
            res.json({error: 'Nenhum cliente foi encontrado, não há dados.'});
            return;
        }

        res.json(allServices)

    } catch (error) {
        res.status(500).json({error: 'Ocorreu um erro na busca.'});
        return;
    }

    
});

router.put('/putService/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const updateData = req.body;
        
        if(!id) {
            res.json({error: 'Não foi informado um id'});
            return;
        }

        const isValid = dataValidation.safeParse(req.body);
        if(!isValid) {
            res.json({error: 'Dados em formato inválido, não segue o padrão'});
            return;
        }

        const update = await serviceModel.findByIdAndUpdate(id, updateData, { new: true });

        if(!update) {
            res.status(404).json({ error: 'Cliente não encontrado'});
            return;
        }

        res.status(200).json({sucess: 'Cliente atualizado', data: updateData});
    } catch (error) {
        res.status(500).json({error: 'Houve um erro durante a atualização do usuario.'});
        return;
    }
})

router.delete('/delService/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            res.json({error: 'Você precisa informar um ID válido.'});
        }

        const deleteById = await serviceModel.findByIdAndDelete(id);

        if(!deleteById) { 
            res.status(404).json({error: 'Não foi possivel encontrar o usuario com este id.' })
            return;
        }

        res.status(200).json({sucess: `User ID: ${id} foi deletado com sucesso.`});
    } catch(error) {
        res.status(500).json({error: 'Não foi possivel deletar, ocorreu um erro durante o processo.'});
    }
});

export default router