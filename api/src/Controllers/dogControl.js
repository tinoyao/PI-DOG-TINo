const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getApiInfo = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a7a64a4a-91b2-4745-8551-d10ba1331755`)
    
    const dogInfo = await api.data.map(d => {

        const weightMM = []
        d.weight.metric.split('-')?.forEach(el => {
            weightMM.push(parseInt(el.trim()));
        })
        if(!weightMM[1]){
            weightMM.push(weightMM[0])
        }

        return {
            id: d.id,
            name: d.name,
            weight: weightMM,
            image: d.image.url,
            temperament: d.temperament
        }
    })

    return dogInfo;
}

const getDbInfo = async () => {
    const dogDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    const dogInfo = await dogDb.map(d => {

        const weightMM = []
        d.weight.split("-")?.forEach(element => {
            weightMM.push(parseInt(element.trim()));
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }

        return{
            id: d.id,
            name: d.name,
            weight: weightMM,
            image: d.image,
            temperament: d.temperaments,
            created: d.created
        }
    })

return dogInfo;
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo
}

const getDetailsApiInfo = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a7a64a4a-91b2-4745-8551-d10ba1331755`)

    const dogInfo = await api.data.map(d => {

        const heightMM = []
        d.height.metric.split("-")?.forEach(el => {
            heightMM.push(parseInt(el.trim()));
        })
        if (!heightMM[1]) {
            heightMM.push(heightMM[0])
        }

        const weightMM = []
        d.weight.metric.split("-")?.forEach(el => {
            weightMM.push(parseInt(el.trim()));
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }

        const life_SpanAA = []
        d.life_span.split("-")?.forEach(el => {
            life_SpanAA.push(parseInt(el.trim()));
        })
        if (!life_SpanAA[1]) {
            life_SpanAA.push(life_SpanAA[0])
        }

        return{
            id: d.id,
            name: d.name,
            height: heightMM,
            weight: weightMM,
            lifeSpan: life_SpanAA,
            image: d.image.url,
            temperament: d.temperament,
            origin: d.origin
        }
    })

    return dogInfo;
}

const getDetailsDBinfo = async () => {
    const dogInDB = await Dog.findAll({
        include:{ 
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    const dogInfo = await dogInDB.map(d => {
        const heightMM = []
        d.height.split("-")?.forEach(el => {
            heightMM.push(parseInt(el.trim()));
        })
        if (!heightMM[1]) {
            heightMM.push(heightMM[0])
        }

        const weightMM = []
        d.weight.split("-")?.forEach(el => {
            weightMM.push(parseInt(el.trim()));
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }

        const life_SpanAA = []
        d.life_span.split("-")?.forEach(el => {
            life_SpanAA.push(parseInt(el.trim()));
        })

        return{
            id: d.id,
            name: d.name,
            height: heightMM,
            weight: weightMM,
            lifeSpan: life_SpanAA,
            image: d.image,
            temperament: d.temperaments,
            created: d.created
        }
    })
    
return dogInfo;
}


const getDetailsDogs = async () => {
    const apiInfo = await getDetailsApiInfo();
    const dbInfo = await getDetailsDBinfo();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo
}
module.exports = {
    getAllDogs,
    getDetailsDogs
}