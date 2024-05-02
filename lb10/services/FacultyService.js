const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class FacultyService {

    async getFaculties() {
        return await prisma.faculty.findMany();
    }

    async getPulpitsByFaculty(id) {
        const pulpitsByFac= await prisma.faculty
            .findUnique({ where: { facId: id } })
            .pulpits();
            return pulpitsByFac
    }

    async getFacultyWithSubjects(id) {
        return await prisma.faculty.findUnique({
            where: { facId: id },
            select: {
                facultyName: true,
                pulpits: {
                    select: {
                        pulpitName: true,
                        subjects: { select: { subjectName: true } }
                    },

                }
            }
        })
    }
    async deleteFaculty(id) {
        return await prisma.faculty.delete({ where: { facId: id } })
    }
    async createFaculty(fac) {
        console.log("fffff" + fac)
        //const { facultyAbbr, facultyName, pulpits } = fac;
        console.log(facultyAbbr)
        console.log("abbr" + fac.facultyAbbr)

        if (!fac.facultyAbbr || !fac.facultyName)
            throw new Error('Введите все данные корректно');
        return await prisma.faculty.create({
            data: {
                facultyAbbr: fac.facultyAbbr,
                facultyName: fac.facultyName,
                pulpits: {
                    create: fac.pulpits || []
                },
            },
            include: { pulpits: true }
        })

    }
    async updateFaculty(id, newData) {
        const { facultyAbbr, facultyName } = newData;
        if (!facultyAbbr || !facultyName)
            throw new Error('Введите все данные корректно');
        return await prisma.faculty.update({
            where: {
                facId: id
            },
            data: {
                facultyAbbr: facultyAbbr,
                facultyName: facultyName,
            }
        })
    }
}

module.exports = new FacultyService()