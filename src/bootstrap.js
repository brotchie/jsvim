function _sigset(a,b) {
//    console.log('Setting signal ' + a);
}
function _tgoto() {}
function _nanosleep() {}

var OK = 1;
var FAIL = 0;

function _gui_mch_prepare(){}
function _gui_mch_get_color(name) {
    // Long representation of color.
    return 0;
}

function _gui_mch_init() {
    return OK;
}

function _gui_mch_init_font(name, set) {
    return OK;
}

function _gui_mch_set_font(name) {}

function _gui_mch_create_scrollbar(sb, type, wnd) {
    console.log('Create scrollbar ' + [sb, type, wnd].join(', '));
}
function _gui_mch_enable_scrollbar(sb, flag) {
    console.log('Enabled scrollbar ' + [sb, flag].join(', '));
}
function _gui_mch_set_scrollbar_pos(sb, x, y, w, h) {
    console.log('Setting scrollbar position ' + sb + ' ' + [x,y,w,h].join(', ') + '.');
}
function _gui_mch_set_scrollbar_thumb(sb, val, size, max) {
    console.log('Setting scrollbar thumb ' + sb + ' ' + [val, size, max].join(', ') + '.');
}

function _gui_mch_get_winpos(x, y) {
    setValue(x, 0, 'i32');
    setValue(y, 0, 'i32');
}

function _gui_mch_get_screen_dimensions(screen_w, screen_h) {
    setValue(screen_w, 1024, 'i32');
    setValue(screen_h, 768, 'i32');
}

function _gui_mch_set_shellsize(width, height, min_width, min_height, base_width, base_height, direction) {
    console.log('Setting shellsize ' + width + 'x' + height + '.');
}

function _gui_mch_update() {
    term.update();
}

function _gui_mch_set_text_area_pos(x, y, w, h) {
    console.log('Setting text area position ' + [x,y,w,h].join(', ') + '.');
}

function _gui_mch_open() {
    return OK;
}

function _gui_mch_get_rgb(color) {
    return 0;
}

function _gui_mch_set_fg_color(color) {}
function _gui_mch_set_bg_color(color) {}
function _gui_mch_set_sp_color(color) {}

function _gui_mch_draw_string(row, col, pstr, len, flags) {
    var string = Pointer_stringify(pstr, len);
    console.log('Draw string ' + row + ', ' + col + ' "' + string + '".');
    term.drawString(row, col, string);
}

function _gui_mch_new_colors() {}
function _gui_mch_flush() {}
function _gui_mch_start_blink() {}
function _gui_mch_stop_blink() {}
function _gui_mch_set_blinking(waittime, on, off) {}

var inputadded = 0;
var calls = 0;
var keyBuffer = [];

function _gui_mch_wait_for_chars(wtime) {
    console.log('Waiting for chars. Timeout: ' + wtime + '.');
    calls++;

    if (keyBuffer.length) {
        //var input = "iHello World\x1b";
        var input = keyBuffer.join('');
        keyBuffer = [];
        esp = Runtime.stackSave();

        pInput = Runtime.stackAlloc(input.length+1);
        writeStringToMemory(input, pInput, 0);

        Runtime.stackRestore(esp);
        _add_to_input_buf(pInput, input.length);
        return OK;
    } else {
        return FAIL;
    }

    if (calls > 100) {
        assert(0);
    }

}

function _gui_mch_beep() {}
function _gui_mch_clear_all() {
    console.log('Clear all.');
}
function _gui_mch_delete_lines(row, num_lines) {
    console.log('Delete ' + num_lines + ' at ' + row + '.');
}
function _gui_mch_clear_block(row1, col1, row2, col2) {
    console.log('Clear block (' + row1 + ', ' + col1 + ')-(' + row2 + ', ' + col2 + ')');
}
function _gui_mch_draw_part_cursor(w, h, color) {
    console.log('Drawing part cursor ' + w + ', ' + h + ' ' + color + '.');
}


