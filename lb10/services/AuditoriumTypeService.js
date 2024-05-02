const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuditoriumTypeService {

    async getAuditoriumTypes() {
        return await prisma.auditorium_type.findMany();
    }
   /* async deleteAuditoriumType(id) {
        const auditoriums= await prisma.auditorium.update({
            where:{
                auditoriumTypeId: id
            },
            data: {
                auditoriumTypeId: null,
            }

        })
        const deleteAuditoriumType=await prisma.auditorium_type.delete({ where: { auditoriumTypeId: id } });
       
        return deleteAuditoriumType
    }*/
    async deleteAuditoriumType(id) {
        const result = await prisma.$transaction([
          prisma.auditorium.updateMany({
            where: {
              auditoriumTypeId: id
            },
            data: {
              auditoriumTypeId: null
            }
          }),
          prisma.auditorium_type.delete({
            where: {
              auditoriumTypeId: id
            }
          })
        ]);
      
        return result[1]; // Возвращает результат удаления auditorium_type
      }
    async createAuditoriumType(auditoriumType) {
        const { auditoriumTypeName } = auditoriumType;
        if (!auditoriumTypeName)
            throw new Error('Введите все данные корректно');
        return await prisma.auditorium_type.create({
            data: {
                auditoriumTypeName: auditoriumTypeName,
            }
        })

    }
    async getAuditoriumTypesWithAuditories(id){
        return await prisma.auditorium_type.findUnique({
            where: { auditoriumTypeId: id},
            select: {
                auditoriumTypeName: true,
                auditoriums: {
                    select: {
                        auditoriumName: true,
                    },

                }
            }
        })
    }
    async updateAuditoriumType(id, newData) {
        const { auditoriumTypeName } = newData;
        if (!auditoriumTypeName)
            throw new Error('Введите все данные корректно');
        return await prisma.auditorium_type.update({
            where: {
                auditoriumTypeId: id
            },
            data: {
                auditoriumTypeName: auditoriumTypeName,
            }
        })
    }
}
module.exports = new AuditoriumTypeService()