const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SubjectService {

    async getSubjects() {
        return await prisma.subject.findMany();
    }
    async deleteSubject(id) {
        return await prisma.subject.delete({ where: { subjectId: id } })
    }
    async createSubject(sub) {
        const { subjectName, pulpitId } = sub;
        if (!subjectName|| !pulpitId )
        throw new Error('Введите все данные корректно');
        const pulpitIdInt=parseInt(pulpitId);
        return await prisma.subject.create({
            data: {
                subjectName: subjectName,
                pulpit: {
                    connect: {
                        pulpitId: pulpitIdInt
                    }
                },
            },
            include: { pulpit: true }
        })
    }
    async updateSubject(id, newData) {
        const { subjectName, pulpitId } = newData;
        if (isNaN(id) || !subjectName|| !pulpitId )
        throw new Error('Введите все данные корректно');
        const pulpitIdInt=parseInt(pulpitId);
        return await prisma.subject.update({
            where: {
                subjectId: id
            },
            data: {
                subjectName: subjectName,
                pulpitId: pulpitIdInt
            }
        })
    }
}
module.exports = new SubjectService()