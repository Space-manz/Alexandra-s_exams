// Функция для склонения слова "экзамен" в зависимости от числа
function declineExams(number) {
    if (number === 1) {
        return "экзамен";
    } else if (number >= 2 && number <= 4) {
        return "экзамена";
    } else {
        return "экзаменов";
    }
}

// Функция для склонения слова "день" в зависимости от числа
function declineDays(number) {
    if (number === 1) {
        return "день";
    } else if (number >= 2 && number <= 4) {
        return "дня";
    } else {
        return "дней";
    }
}

// Функция для обновления сегодняшней даты и дней до 1 мая
function updateDates() {
    const today = new Date();
    const lastExamDate = new Date(today.getFullYear(), 4, 1); // 1 мая (месяц считается с 0, поэтому 4 = май)

    // Выводим сегодняшнюю дату
    document.getElementById('todayDate').innerText = `Сегодняшняя дата: ${today.toLocaleDateString()}`;

    // Рассчитываем количество дней до 1 мая
    const timeDiff = lastExamDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
        document.getElementById('daysLeft').innerText = "Дата последнего экзамена уже прошла.";
    } else {
        document.getElementById('daysLeft').innerText = `До 1 мая осталось ${daysDiff} ${declineDays(daysDiff)}.`;
    }
}

// Функция для расчета частоты экзаменов и даты следующего экзамена
function calculate() {
    const examsLeftInput = document.getElementById('examsLeft');
    const examsLeft = parseInt(examsLeftInput.value);

    // Проверка ввода
    if (isNaN(examsLeft) || examsLeft < 1) {
        alert("Пожалуйста, введите корректное количество экзаменов.");
        return;
    }

    const today = new Date();
    const lastExamDate = new Date(today.getFullYear(), 4, 1); // 1 мая

    const timeDiff = lastExamDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
        document.getElementById('result').innerText = "Дата последнего экзамена уже прошла.";
        return;
    }

    const examsPerDay = examsLeft / daysDiff;

    if (examsPerDay <= 1) {
        // Если в день нужно сдавать меньше одного экзамена
        const frequency = Math.floor(daysDiff / examsLeft);
        const nextExamDate = new Date(today);
        nextExamDate.setDate(today.getDate() + frequency);

        document.getElementById('result').innerText = 
            `Вам нужно сдавать экзамены раз в ${frequency} ${declineDays(frequency)}. 
            Следующий экзамен следует сдать ${nextExamDate.toLocaleDateString()}.`;
    } else {
        // Если в день нужно сдавать больше одного экзамена
        const examsToday = Math.ceil(examsPerDay);
        const examsWord = declineExams(examsToday); // Склоняем слово "экзамен"
        document.getElementById('result').innerText = 
            `Вам нужно сдать ${examsToday} ${examsWord} сегодня.`;
    }
}

// Обновляем даты при загрузке страницы
updateDates();