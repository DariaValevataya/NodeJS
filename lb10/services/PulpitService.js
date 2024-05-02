const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class pulpitService {

    async getPulpits() {
        return await prisma.pulpit.findMany();
    }
    async getPuplitsWithoutTeachers() {
        const puplitsWithoutTeachers = await prisma.$queryRaw`
        SELECT *
        FROM pulpit
        WHERE pulpitId NOT IN (SELECT DISTINCT pulpitId FROM teacher)`;
        return puplitsWithoutTeachers;
    }
    async getPulpitsWithTeacherCount() {
        return await prisma.pulpit.findMany({
            select: {
                pulpitId: true,
                pulpitName: true,
                facultyId: true,
                _count: {
                    select: {
                        teachers: true,
                    },
                },
            },
        });
    }
    async getPuplitsWithVladimir() {
        return await prisma.pulpit.findMany({
            where: {
                teachers: {
                    some: {
                        teacherName: { contains: 'Владимир' }
                    },
                }
            },
            include: {
                teachers: {
                    select: {
                        teacherName: true,
                    }
                }
            }
        });
    }

    async deletePulpit(id) {
        return await prisma.pulpit.delete({ where: { pulpitId: id } })
    }
    async createPulpit(pulpit) {
        const { pulpitName, facultyId } = pulpit;
        if (!pulpitName || !facultyId)
            throw new Error('Введите все данные корректно');
        return await prisma.pulpit.create({
            data: {
                pulpitName: pulpitName,
                faculty: {
                    connectOrCreate: {
                        where: {
                            facultyAbbr: facultyAbbr
                        },
                        create: {
                            facultyAbbr: facultyAbbr,
                            facultyName: facultyName
                        }
                    }
                },
            },
        })

    }
    async updatePulpit(id, newData) {
        const { pulpitName, facultyId } = newData;
        if (!pulpitName || !facultyId)
            throw new Error('Введите все данные корректно');
        const facultyIdInt = parseInt(facultyId);
        return await prisma.pulpit.update({
            where: {
                pulpitId: id
            },
            data: {
                pulpitName: pulpitName,
                facultyId: facultyIdInt
            }

        })

    }
}
module.exports = new pulpitService()