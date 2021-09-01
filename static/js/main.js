$(document).ready(function (message) {

    // получение полей фильтра
    let select_type = $('#type');
    let select_storage = $('#storage');
    let select_lec_type = $('#lec_type');
    let select_lec_month_type = $('#lec_month_type');
    let select_gospel = $('#gospel');
    let select_part_of_list = $('#part_of_list');
    let select_lec_part_type = $('#lec_part_type');

    let input_man_creation_date = $('#man-creation-date-input');
    let input_cipher = $('#cipher-input');
    let input_list_number = $('#list-number-input');
    let input_chapter = $('#chapter-input');
    let input_verse = $('#verse-input');
    let input_verse_quote = $('#verse-quote-input');
    let input_image_name = $('#image-name-input');
    let input_img_creation_date = $('#img-creation-date-input');

    let checkbox_update = $('#is_update')


    // обновление полей фильтра (при изменении любого)
    function refilter() {
        // снятие всех фильтров с манускриптов
        let hidden_divs = $('.manuscript-item').filter('div:hidden');
        for (let hidden_div of hidden_divs) {
            hidden_div.style.display = 'block';
        }
        // снятие всех фильтров с изображений
        hidden_divs = $('.img').filter('a:hidden');
        for (let hidden_div of hidden_divs) {
            hidden_div.style.display = ''
        }

        // обновление по типу
        let change_val = select_type.val();
        if (change_val === 'lect') {
            set_type_lectionary_filter();
        } else if (change_val === 'tetr') {
            set_type_tetr_filter();
        } else if (change_val === 'unkn') {
            set_type_unkn_filter();
        }

        // по месту хранения
        set_storage_filter();
        // по месяцу лекционария
        set_lec_month_type_filter();
        //
        set_lec_type_filter();
        //
        set_gospel_filter();
        //по положению на листе
        set_part_of_list_filter();
        //
        set_lec_part_type_filter();
        //
        cipher_filter();
        //
        list_number_filter();
        //
        chapter_filter();
        //
        verse_filter();
        //
        verse_quote_filter();
        //по имени изображения
        image_name_filter();
        //по дате создания рукописи
        man_creation_date_filter();
        //по дате создания изображения
        img_creation_date_filter();


        //скрытие рукописей, в которых не осталось изображений
        let manuscripts = document.querySelectorAll('.manuscript-item');
        let cnt;
        for (let manuscript of manuscripts) {
            imgs = manuscript.querySelectorAll('.img');
            cnt = 0;
            for (let img of imgs) {
                if (img.style.display !== 'none') {
                    cnt += 1;
                }
            }

            if (cnt === 0) {
                manuscript.style.display = 'none';
            }
        }

        //показать элементы требующие уточнения
        update_filter();
    }


    // обработка фильтра тип - лекционарий
    function set_type_lectionary_filter() {
        let manuscripts = document.querySelectorAll('.manuscript-item');
        for (let manuscript of manuscripts) {
            if (!((manuscript.querySelector('.type').textContent).split(' ')[1] === 'Lect')) {
                manuscript.style.display = 'none';
            }
        }
    }

    // обработка фильтра тип - четвероевангелие
    function set_type_tetr_filter() {
        let manuscripts = document.querySelectorAll('.manuscript-item');
        for (let manuscript of manuscripts) {
            // console.log(manuscript.getElementsByClassName('type'))

            if (!((manuscript.querySelector('.type').textContent).split(' ')[1] === 'Tetr')) {
                manuscript.style.display = 'none';
            }
        }
    }

    // обработка фильтра тип - неизвестно
    function set_type_unkn_filter() {
        let manuscripts = document.querySelectorAll('.manuscript-item');
        for (let manuscript of manuscripts) {
            if (!((manuscript.querySelector('.type').textContent).split(' ')[1] === 'unknown')) {
                manuscript.style.display = 'none';
            }
        }
    }

    select_type.change(function () {
        refilter()
    })

    // обработка фильтра - место хранения
    function set_storage_filter() {
        let storage_val = select_storage.val();

        let manuscripts = document.querySelectorAll('.manuscript-item');
        for (let manuscript of manuscripts) {
            let man_val = manuscript.querySelector('.storage').textContent;
            man_val = man_val.replace('Storage: ', '')
            if (man_val !== storage_val && storage_val !== '-') {
                manuscript.style.display = 'none';
            }
        }
    }

    select_storage.change(function () {
        refilter();
    })


    //
    function set_lec_month_type_filter() {
        let lec_month_val = select_lec_month_type.val()

        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let img_lect_month = img.getAttribute("data-lec-month-type")
            if (lec_month_val !== img_lect_month && lec_month_val !== '-') {
                img.style.display = 'none';
            }
        }
    }

    select_lec_month_type.change(function () {
        refilter();
    })


    function set_lec_type_filter() {
        let lec_type_val = select_lec_type.val()

        let manuscripts = document.querySelectorAll('.manuscript-item');

        for (let manuscript of manuscripts) {
            let man_val = manuscript.querySelector('.lec_type');
            if (man_val) {
                man_val = man_val.textContent.replace('Lec type: ', '');
            } else {
                man_val = '-';
            }
            if ((man_val !== lec_type_val) && (lec_type_val !== '-')) {
                manuscript.style.display = 'none';
            }
        }
    }

    select_lec_type.change(function () {
        refilter();
    })

    function set_gospel_filter() {
        let gospel_val = select_gospel.val()

        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let img_gospel = img.getAttribute("data-gospel")
            if (gospel_val !== img_gospel && gospel_val !== '-') {
                img.style.display = 'none';
            }
        }
    }

    select_gospel.change(function () {
        refilter();
    })


    function set_part_of_list_filter() {
        let part_of_list_val = select_part_of_list.val()

        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let img_part_of_list = img.getAttribute("data-part-of-list")
            if (part_of_list_val !== img_part_of_list && part_of_list_val !== '-') {
                img.style.display = 'none';
            }
        }
    }

    select_part_of_list.change(function () {
        refilter();
    })


    function set_lec_part_type_filter() {
        let lec_part_type_val = select_lec_part_type.val()

        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let img_lec_part_type = img.getAttribute("data-lec-part-type")
            if (lec_part_type_val !== img_lec_part_type && lec_part_type_val !== '-') {
                img.style.display = 'none';
            }
        }
    }

    select_lec_part_type.change(function () {
        refilter();
    })


    // CIPHER
    function cipher_filter() {
        let val = input_cipher.val();

        let manuscripts = document.querySelectorAll('.manuscript-item');
        for (let manuscript of manuscripts) {
            let cipher_name = manuscript.querySelector('.cipher-name').textContent;
            if (val !== "") {
                if (!cipher_name.toLowerCase().includes(val.toLowerCase())) {
                    manuscript.style.display = 'none';
                }
            }
        }
    }

    function cipher_btn_click() {
        refilter();
    }

    if (document.getElementById('cipher-btn')) {
        document.getElementById('cipher-btn').addEventListener('click', cipher_btn_click, true);
    }


    // LIST_NUMBER
    function list_number_filter() {
        let val = input_list_number.val();
        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let list_number_name = img.getAttribute("data-list-number")
            if (val !== "") {
                if (val.toLowerCase() === 'r' || val.toLowerCase() === 'v') {
                    if (!list_number_name.toLowerCase().includes(val.toLowerCase())) {
                        img.style.display = 'none';
                    }
                } else if (list_number_name !== val) {
                    img.style.display = 'none';
                }
            }
        }
    }

    function list_number_btn_click() {
        refilter();
    }

    if (document.getElementById('list-number-btn')) {
        document.getElementById('list-number-btn').addEventListener('click', list_number_btn_click, true);
    }

    // CHAPTER
    function chapter_filter() {
        let val = input_chapter.val();
        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let chapter_name = img.getAttribute("data-chapter")
            if (val !== "") {
                if (!chapter_name.toLowerCase().includes(val.toLowerCase())) {
                    img.style.display = 'none';
                }
            }
        }
    }

    function chapter_btn_click() {
        refilter();
    }

    if (document.getElementById('chapter-btn')) {
        document.getElementById('chapter-btn').addEventListener('click', chapter_btn_click, true);
    }

    // VERSE
    function verse_filter() {
        let val = input_verse.val();
        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let verse_name = img.getAttribute("data-verse")
            if (val !== "") {
                if (!verse_name.toLowerCase().includes(val.toLowerCase())) {
                    img.style.display = 'none';
                }
            }
        }
    }

    function verse_btn_click() {
        refilter();
    }

    if (document.getElementById('verse-btn')) {
        document.getElementById('verse-btn').addEventListener('click', verse_btn_click, true);
    }

    // VERSE_QUOTE
    function verse_quote_filter() {
        let val = input_verse_quote.val();
        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let verse_quote_name = img.getAttribute("data-verse-quote")
            if (val !== "") {
                if (!verse_quote_name.toLowerCase().includes(val.toLowerCase())) {
                    img.style.display = 'none';
                }
            }
        }
    }

    function verse_quote_btn_click() {
        refilter();
    }

    if (document.getElementById('verse-quote-btn')) {
        document.getElementById('verse-quote-btn').addEventListener('click', verse_quote_btn_click, true);
    }

    // IMAGE_NAME
    function image_name_filter() {
        let val = input_image_name.val();
        let imgs = document.querySelectorAll('.img');
        for (let img of imgs) {
            let image_name = img.getAttribute("data-image-name")
            if (val !== "") {
                if (!image_name.toLowerCase().includes(val.toLowerCase())) {
                    img.style.display = 'none';
                }
            }
        }
    }

    function image_name_btn_click() {
        refilter();
    }

    if (document.getElementById('image-name-btn')) {
        document.getElementById('image-name-btn').addEventListener('click', image_name_btn_click, true);
    }

    // MAN_CREATION_DATE
    function man_creation_date_filter(message) {
        let val = input_man_creation_date.val();
        if (val.length === 0) {
            return false;
        }
        if (val.length === 8 || val.length === 17) {
            let val_bgn, val_end;
            if (val.length === 8) {
                val_bgn = val;
                val_end = val;
            } else {
                val_bgn = val.substr(0, 8);
                val_end = val.substr(9, 8);
            }
            let manuscripts = document.querySelectorAll('.manuscript-item');
            for (let manuscript of manuscripts) {
                let date_bgn = manuscript.getAttribute("data-creation-date-bgn");
                let date_end = manuscript.getAttribute("data-creation-date-end");
                if (!((val_bgn >= date_bgn && val_bgn <= date_end || val_end >= date_bgn && val_end <= date_end) ||
                    (val_bgn < date_bgn && val_end >= date_bgn && val_end <= date_end) ||
                    (val_bgn >= date_bgn && val_bgn <= date_end && val_end >= date_end) ||
                    (val_bgn < date_bgn && val_end >= date_end))) {
                    // console.log('No', date_bgn, date_end, val_bgn, val_end)
                    manuscript.style.display = 'none';
                } else{
                    // console.log('Yes', date_bgn, date_end, val_bgn, val_end)
                }
            }
        } else {
            alert('Некорректный формат даты!');
        }
    }

    function man_creation_date_btn_click() {
        refilter();
    }

    if (document.getElementById('man-creation-date-btn')) {
        document.getElementById('man-creation-date-btn').addEventListener('click', man_creation_date_btn_click, true);
    }

    //Ограничение на ввод в поле форматом
    //12345678 или 12345678-12345678
    $('body').on('input', '#man-creation-date-input', function () {
        let bgn_str = this.value.substr(0, 8);
        let mid_str = this.value.substr(8, 1);
        let end_str = this.value.substr(9, 8);
        bgn_str = bgn_str.replace(/[^0-9]/g, '');
        mid_str = mid_str.replace(/[^-]/g, '');
        end_str = end_str.replace(/[^0-9]/g, '');
        this.value = bgn_str + mid_str + end_str;

    })

    // IMG_CREATION_DATE
    function img_creation_date_filter() {
        let val = input_img_creation_date.val();
        if (val.length === 0) {
            return false;
        }
        if (val.length === 8 || val.length === 17) {
            let val_bgn, val_end;
            if (val.length === 8) {
                val_bgn = val;
                val_end = val;
            } else {
                val_bgn = val.substr(0, 8);
                val_end = val.substr(9, 8);
            }
            let imgs = document.querySelectorAll('.img');
            for (let img of imgs) {
                let date_bgn = img.getAttribute("data-creation-date-bgn");
                let date_end = img.getAttribute("data-creation-date-end");
                if (!((val_bgn >= date_bgn && val_bgn <= date_end || val_end >= date_bgn && val_end <= date_end) ||
                    (val_bgn < date_bgn && val_end >= date_bgn && val_end <= date_end) ||
                    (val_bgn >= date_bgn && val_bgn <= date_end && val_end >= date_end) ||
                    (val_bgn < date_bgn && val_end >= date_end))) {
                    img.style.display = 'none';
                }
            }
        } else {
            alert('Некорректный формат даты!');
        }
    }

    function img_creation_date_btn_click() {
        refilter();
    }

    if (document.getElementById('img-creation-date-btn')) {
        document.getElementById('img-creation-date-btn').addEventListener('click', img_creation_date_btn_click, true);
    }

    //Ограничение на ввод в поле форматом
    //12345678 или 12345678-12345678
    $('body').on('input', '#img-creation-date-input', function () {
        let bgn_str = this.value.substr(0, 8);
        let mid_str = this.value.substr(8, 1);
        let end_str = this.value.substr(9, 8);
        bgn_str = bgn_str.replace(/[^0-9]/g, '');
        mid_str = mid_str.replace(/[^-]/g, '');
        end_str = end_str.replace(/[^0-9]/g, '');
        this.value = bgn_str + mid_str + end_str;

    })

    // сброс фсех фильтров
    function filters_clear() {
        select_type.val('-');
        select_storage.val('-');
        select_lec_type.val('-');
        select_lec_month_type.val('-');
        select_gospel.val('-');
        select_part_of_list.val('-');
        select_lec_part_type.val('-');

        input_man_creation_date.val('');
        input_img_creation_date.val('');
        input_cipher.val('');
        input_list_number.val('');
        input_chapter.val('');
        input_verse.val('');
        input_verse_quote.val('');
        input_image_name.val('');

        refilter();
    }

    if (document.getElementById('filters_clear')) {
        document.getElementById('filters_clear').addEventListener('click', filters_clear, true);
    }


    // CHECKBOX UPDATE
    function update_filter() {
        if ($('#is_update').is(':checked')){
            let manuscripts = document.querySelectorAll('.manuscript-item');
            for (let manuscript of manuscripts) {
                if (!manuscript.classList.contains('update')){
                    manuscript.style.display = 'none';
                }
            }
            let imgs = document.querySelectorAll('.img');
            for (let img of imgs) {
                if (!img.classList.contains('update')){
                    img.style.display = 'none';
                }
            }
        }
    }

    function is_update() {
        refilter();
    }

    if (document.getElementById('is_update')) {
        document.getElementById('is_update').addEventListener('click', is_update, true);
    }


    // LINK FILTER MAN STORAGE
    if (document.getElementsByClassName('link-storage')) {
        let links = document.getElementsByClassName('link-storage');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].addEventListener('click', link_input, true);
        }
    }


    // LINK FILTER MAN TYPE
    if (document.getElementsByClassName('link-type')) {
        let links = document.getElementsByClassName('link-type');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].addEventListener('click', link_input, true);
        }
    }

    // LINK FILTER MAN LEC TYPE
    if (document.getElementsByClassName('link-lec-type')) {
        let links = document.getElementsByClassName('link-lec-type');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].addEventListener('click', link_input, true);
        }
    }

    function link_input() {
        let val = this.text;
        $("option:contains("+val+")").attr('selected', true)
        refilter();
    }


    // LINK MAN DATE
    if (document.getElementsByClassName('man-date')) {
        let links = document.getElementsByClassName('man-date');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].addEventListener('click', link_date, true);
        }
    }

    function link_date() {
        let date_bgn = this.getAttribute("data-date-bgn");
        let date_end = this.getAttribute("data-date-end");
        if (date_bgn !== 'None'){
            let date;
            if (date_bgn === date_end){
                date = date_bgn;
            } else {
                date = date_bgn + '-' + date_end;
            }
            input_man_creation_date.val(date);
            refilter();
        }
    }

    //функция выравнивания высоты и ширины изображений для корректного поворота
    $(function(){
        let img_wrapper = $('.img-container')
        img_wrapper.height(img_wrapper.width());

        let img = $('.image');
        w = img.width;
        h = img.height;
        if (w > h){
            img.width(img_wrapper.width())

            $(window).resize(function(){
                img.width(img_wrapper.width());
                img.height(h*img_wrapper.width/w);
            });
        } else {
            img.height(img_wrapper.height())

            $(window).resize(function(){
                img.height(img_wrapper.height());
                img.width(w*img_wrapper.height/h);
            });
        }

        //
        // $(window).resize(function(){
        //     img_wrapper.height(img_wrapper.width());
        // });
    });

    // ajax-запрос для поворота изображения без поворота экрана
    $('.rotate-img').click(function() {
        // let id = self.getAttribute("data-creation-date-bgn");
        let id = $(this).attr("data-rotate-id");
        let cookie = document.cookie;
        let csrfToken = cookie.substring(cookie.indexOf('=') + 1);
        $.ajax({
            type: 'post',
            headers: {
                'X-CSRFToken': csrfToken
            },
            url: '/api/v1/manuscript/img_rotate/' + id + '/',
            success: function(response) {
                let img = $('#img_' + id);
                if(img.hasClass('north')){
                    img.removeClass('north');
                    img.addClass('west');
                }else if(img.hasClass('west')){
                    img.removeClass('west');
                    img.addClass('south');
                }else if(img.hasClass('south')){
                    img.removeClass('south');
                    img.addClass('east');
                }else if(img.hasClass('east')){
                    img.removeClass('east');
                    img.addClass('north');
                }
            },
            error: function(e, x, r) {
                console.log('Error send form to rotate img');
            }
        });
        return false;
    });

})
