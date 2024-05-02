const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TeacherService {

    async getTeachers() {
        return await prisma.teacher.findMany();
    }
    async deleteTeacher(id) {
        return await prisma.teacher.delete({ where: { teacherId: id } })
    }
    async createTeacher(teacher) {
        const { teacherName, pulpitId } = teacher;
        if (!teacherName || !pulpitId)
            throw new Error('Введите все данные корректно');
        const pulpitIdInt = parseInt(pulpitId);
        return await prisma.teacher.create({
            data: {
                teacherName: teacherName,
                pulpit: {
                    connect: {
                        pulpitId: pulpitIdInt
                    }
                },
            },
            include: { pulpit: true }
        })

    }
    async updateTeacher(id, newData) {
        const { teacherName, pulpitId } = newData;
        if (isNaN(id) || !teacherName || !pulpitId)
            throw new Error('Введите все данные корректно');
        const pulpitIdInt = parseInt(pulpitId);
        return await prisma.teacher.update({
            where: {
                teacherId: id
            },
            data: {
                teacherName: teacherName,
                pulpitId: pulpitIdInt
            }
        })
    }
}
module.exports = new TeacherService()