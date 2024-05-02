INSERT INTO faculty (facId, facultyAbbr, facultyName)
VALUES (1, 'ФКСиС', 'Факультет компьтерных систем и сетей');
INSERT INTO faculty (facId, facultyAbbr, facultyName)
VALUES (2, 'ФКП', 'Факультет компьютерного проектирвания');
INSERT INTO faculty (facId, facultyAbbr, facultyName)
VALUES (3, 'ФИБ', 'Факультет информационной безопасности');
INSERT INTO faculty (facId, facultyAbbr, facultyName)
VALUES (4, 'ФРЭ', 'Факультет радиотехники и электроники');


select *from pulpit;
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (1, 'Кафедра высшей математики', 2);
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (2, 'Кафедра защиты информации', 3);
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (3, 'Кафедра инфокоммуникационных технологий', 1);
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (4, 'Кафедра информатики', 1);
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (5, 'Кафедра менеджмента', 3);
INSERT INTO pulpit (pulpitId, pulpitName, facultyId)
VALUES (6, 'Кафедра физики', 2);


INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (1, 'Физика', 6);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (2, 'Высшая математика', 1);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (3, 'Психология', 2);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (4, 'Информационная безопасность', 1);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (5, 'Паттерны проектирования', 3);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (6, 'Программирование моб систем', 4);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (7, 'Дизайн', 5);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (8, 'Квалиметрия', 2);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (9, 'Информационн0-измерительные системы', 3);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (10, 'База данных', 4);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (11, 'Архитектура ПЭВМ', 5);
INSERT INTO subject (subjectId, subjectName, pulpitId)
VALUES (12, 'Автоматизация проектирования', 6);

INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (1, 'Граюшева Дарья Анатольевна', 6);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (2, 'Василевская Анастасия Леонидовна', 3);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (3, 'Быков Дмитрий Викторович', 3);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (4, 'Гурьев Игорб Анатольевич', 6);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (5, 'Гавриленко Юрий Максимович', 2);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (6, 'Картавик Дарья Александровна', 2);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (7, 'Лощинина Анна Сергеевна', 1);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (8, 'Валеватая Дарья Анатольевна', 1);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (9, 'Панков Герман Юрьевич', 4);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (10, 'Стальмахова Наталия Владиславовна', 4);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (11, 'Волк Никита Витальевич', 5);
INSERT INTO teacher (teacherId, teacherName, pulpitId)
VALUES (12, 'Заславский Константин Александрович', 5);


SELECT p.*, COUNT(t.teacherId) AS teacher_count
        FROM pulpit p
        Inner JOIN teacher t ON p.pulpitId = t.pulpitId
        GROUP BY p.pulpitId, p.pulpitName;