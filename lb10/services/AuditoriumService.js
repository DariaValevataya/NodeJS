const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuditoriumService {

    async getAuditoriums() {
        return await prisma.auditorium.findMany();
    }
    async deleteAuditorium(id) {
        return await prisma.auditorium.delete({ where: { auditoriumId: id } })
    }
    async createAuditorium(auditorium) {
        const { auditoriumName, auditoriumCapacity, auditoriumTypeId } = auditorium;
        if (!auditoriumName || !auditoriumTypeId || !auditoriumCapacity)
            throw new Error('Введите все данные корректно');
        const auditoriumTypeIdInt = parseInt(auditoriumTypeId);
        const auditoriumCapacityInt = parseInt(auditoriumCapacity);

        return await prisma.auditorium.create({
            data: {
                auditoriumName: auditoriumName,
                auditoriumCapacity: auditoriumCapacityInt,
                auditoriumType: {
                    connect: {
                        auditoriumTypeId: auditoriumTypeIdInt
                    }
                },
            },
            include: { auditoriumType: true }

        })

    }
    async updateAuditorium(id, newData) {
        const { auditoriumName, auditoriumCapacity, auditoriumTypeId } = newData;
        if (!auditoriumName || !auditoriumTypeId || !auditoriumCapacity)
            throw new Error('Введите все данные корректно');
        const auditoriumTypeIdInt = parseInt(auditoriumTypeId);
        const auditoriumCapacityInt = parseInt(auditoriumCapacity);

        return await prisma.auditorium.update({
            where: {
                auditoriumId: id
            },
            data: {
                auditoriumName: auditoriumName,
                auditoriumCapacity: auditoriumCapacityInt,
                auditoriumTypeId: auditoriumTypeIdInt
            }
        })
    }

    async getAuditoriumsSameCount() {
        const auditoriums = prisma.auditorium.groupBy({
            by: ["auditoriumCapacity", "auditoriumTypeId"],
            _count: true,
            having: {
                auditoriumId: {
                    _count: { gt: 1 }
                }
            }
        });
        if (auditoriums.length === 0)
            throw new Error('Нет аудиторий с одниковым типом и вместимостью');
        else
            return auditoriums
    }
    async getauditoriumsWithComp1() {
        return await prisma.auditorium.findMany({
            where:{
                auditoriumType:{
                    auditoriumTypeName:'ЛБ-К'
                },
                auditoriumName:{
                    endsWith:'-1'
                }
            }
           
        });
    }

}
module.exports = new AuditoriumService()