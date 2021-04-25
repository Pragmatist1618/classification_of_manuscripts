$(document).ready(function () {
    let check_box_lectionary = $('#is_lectionary');
    let check_box_not_lectionary = $('#not_lectionary');

    // обновление полей фильтра (при снятии любого)
    function refilter() {
        // снятие всех фильтров
        let hidden_divs = $('.manuscript-item').filter('div:hidden');
        for (let hidden_div of hidden_divs){
            hidden_div.style.display = 'block';
        }
        // запуск оставшихся
        if (check_box_lectionary.is(':checked')){
            set_lectionary_filter();
        }
        if (check_box_not_lectionary.is(':checked')){
            set_not_lectionary_filter();
        }
    }


    // при нажатии на чексбокс фильтра Лекционарий
    function set_lectionary_filter(){
        let manuscripts = document.querySelectorAll('.manuscript-item');
            for (let manuscript of manuscripts) {
                if (!manuscript.getElementsByClassName('lectionary').length) {
                    manuscript.style.display = 'none';
                }
            }
    }

    check_box_lectionary.click(function () {
        // если нажат
        if (check_box_lectionary.is(':checked')) {
            set_lectionary_filter()
        } else {
            refilter();
        }
    })

     // при нажатии на чексбокс фильтра не Лекционарий
    function set_not_lectionary_filter(){
        let manuscripts = document.querySelectorAll('.manuscript-item');
            for (let manuscript of manuscripts) {
                if (manuscript.getElementsByClassName('lectionary').length) {
                    manuscript.style.display = 'none';
                }
            }
    }

    check_box_not_lectionary.click(function () {
        // если нажат
        if (check_box_not_lectionary.is(':checked')) {
            set_not_lectionary_filter()
        } else {
            refilter();
        }
    })
})