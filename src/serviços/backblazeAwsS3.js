const aws = require('aws-sdk');

const rota = new aws.Endpoint(process.env.ENDPOINT_S3);

const awsS3 = new aws.S3({
    endpoint: rota,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const carregarImagem = async (caminho, buffer, tipoMIME) => {
    try {
        const imagem = await awsS3.upload({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: caminho,
            Body: buffer,
            ContentType: tipoMIME
        }).promise()

        return {
            caminho: imagem.Key,
            url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${imagem.Key}`
        }
    } catch (error) {
        return {
            erro: 'Erro ao tentar carregar imagem na nuvem.',
            detalhes: error.message
        }
    }

}

const excluirImagem = async (caminho) => {
    try {
        await awsS3.deleteObject({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: caminho
        }).promise()
    } catch (error) {
        return {
            erro: 'Erro ao tentar excluir imagem.',
            detalhes: error.message
        }
    }
}

module.exports = {
    carregarImagem,
    excluirImagem
}