var DELAY = 2500;
var ISSUBMIT = false;
var ShowCandidates = false;
var CandidatePopUpShown = false;
function callfunction() {
  setTimeout(function () {
    $('.e').after('<b class="asterrisk" style="color:#ff0500;display:none;position:absolute;top:0; right:-1px;" >*</b>');
    $('.asterrisk').fadeIn('1000');
    $('select').not('.noselect2').select2();
    $('select').css('width', '100%');
    //$('.ngx-pagination li').addClass('btn  btn-raised btn-primary');
  }, 2000);

}
$(function () {
  var newWin;
  $(document).delegate(".printview", "click", function (e) {
    e.preventDefault();
    var windowname = "printhelper";

    var width = "800";
    var height = "550";
    if ($(this).attr('w') !== undefined) {
      width = $(this).attr('w');
    }
    if ($(this).attr('h') !== undefined) {
      height = $(this).attr('h');
    }
    if ($(this).attr('n') !== undefined) {
      windowname = $(this).attr('n');
    }


    if (newWin != undefined && !newWin.closed) {
      alert("print preview already opened");
      newWin.focus();
      return false;
    }
    var tar;
    if ($(this).attr('tar') === undefined) {
      tar = $(this).next();
    } else {

      tar = $(this).attr('tar');
    }
    $('iframe,input:submit').hide();
    newWin = open('url', windowname, 'scrollbars=1,height=' + height + ',width=' + width);
    $(tar).find('.showprint').show();
    var html = $(tar).html();
    var addinBody = '';
    if ($(this).attr('npsn') === undefined) {
      addinBody = ' body:before{ content:""; border-bottom:solid 1px black; text-align:center; width:980px; font-weight:bold; font-size:20px;} ';
    }
    var morehtml = '<style>.postive{ border:solid 1px black; margin:2px; padding:2px;}' + addinBody + ' .hide,.hideonprint{ display:none;} @media print{ .hideonprint,.notprint{ display:none;} .pba{page-break-after:always}}</style>';
    if ($(this).attr('rp') === undefined) {
      morehtml += "<a href='#' style='float:right; position:fixed; top:0px; right:10px;' class='notprint' onclick='window.print();'>Print</a>";
    }
    newWin.document.write(morehtml + html);
    if ($(this).attr('rp') != undefined) {
      newWin.window.print();
      newWin.close();
    }
    $(tar).find('.showprint').hide();
    $('iframe,input:submit').show();
    return false;
  });

  $('body').delegate('.playlink', 'click', function () {

    $(this).parent().parent().find('.player').html('<audio controls="" autoplay><source src="' + $(this).attr('link') + '" type="audio/wav">Your browser does not support the audio element.</audio>');
    //$(this).next().find('source').attr('src', $(this).attr('link'));
  });
  //    $('#candidateshow').on('hidden.bs.modal', function () {
  //
  //        if (ShowCandidates != undefined && ShowCandidates == true) {
  //            $('#candidatesall').modal('show');
  //        }
  //        CandidatePopUpShown = false;
  //        // do something…
  //    });
  //    $('#candidateshow').on('shown.bs.modal', function () {
  //        $('#candidatesall').modal('hide');
  //        CandidatePopUpShown = true;
  //        // do something…
  //    });


  $(window).scroll(function () {

    $('body .error').hide();
  });
  $.fn.IsValidEmail = function (email) {
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ($.trim(email) == '' || pattern.test(email)) {
      return true;
    }
    return false;
  }
  $.fn.IsValidWebsiteName = function (websiteName) {
    var pattern = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
    if (pattern.test(websiteName)) {
      return true;
    }
    return false;
  }
  $.fn.IsValidMoblieNo = function (no) {
    var pattern = /^[0-9-+]+$/;
    if (pattern.test(no) && no.length > 9) {
      return true;
    }
    return false;
  }
  $.fn.IsEmpty = function (str, control) {
    if ($(control).prop('tagName') === "SELECT") {
      if (str === '? undefined:undefined ?' || ($(control).prop('d') !== undefined && $(control).prop('d') === str)) {
        return false;

      }

    }
    if (str === "") {
      return false;
    }
    return true;
  }
  $.fn.addpopup = function (msg, title, size) {
    // $('#myModalcustom').remove();
    if (size == undefined) {
      size = 'md';
    }
    if (title == undefined) {
      title = "Message";
    }
    if ($('#myModalcustom').length == 0) {
      $('body').append('<div class="modal fade" id="myModalcustom"><div class="modal-dialog    modal-' + size + '"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title"></h4></div><div class="modal-body"><p></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">OK</button>        </div></div></div></div>');
    }
    $('#myModalcustom .modal-title').html(title);
    $('#myModalcustom .modal-body').html(msg);
    $('#myModalcustom').modal('show');
  }
  $.fn.ShowPopUp = function (msg, title, size) {
    //$('#ShowPopUp').remove();
    if (size == undefined) {
      size = 'md';
    }
    if (title == undefined) {
      title = "Message";
    }
    if ($('#ShowPopUp').length == 0) {
      $('body').append('<div class="modal fade" id="ShowPopUp"><div class="modal-dialog    modal-' + size + '"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"></h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div><div class="modal-body"><p></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">OK</button>        </div></div></div></div>');
    }
    $('#ShowPopUp .modal-title').html(title);
    $('#ShowPopUp .modal-body').html(msg);
    $('#ShowPopUp').modal('show');
    setTimeout(function () {
      $('#ShowPopUp').modal('hide');
    }, 2000);
  }
  $.fn.showMessage = $.fn.ShowPopUp;



  $.fn.ShowMsg = function (element, error, tagname) {
    var name = $(element).attr('n');
    if (name == undefined) {
      name = $(element).attr('n');
    }
    var offset;
    if ($(element).attr('pp') == undefined) {
      offset = $(element).parent().offset();
    } else {
      offset = $(element).offset();
    }
    var width = $(element).width();
    if (width > 1000 || width < 200) {
      width = 300;
    }
    var leftOff = offset.left;
    var topOff = offset.top - 35;


    var id = $(element).attr('id');
    var addtoid = 'error';

    var finalid = addtoid + id;
    //        if (ISSUBMIT) {
    //            finalid = "after" + addtoid + id;
    //        }
    var finalidstr = finalid;
    finalid = '#' + finalid;

    if ($(finalid).length === 0) {


      $('body').append('<div id="' + finalidstr + '"  class="error_new"><div></div></div>');
      $(finalid).css({ top: topOff + 'px', left: leftOff + 'px', width: width+'px' });

      //
      //            if (ISSUBMIT) {
      //                $(element).after('<div id="' + finalid + '" class="errorinline"><div></div></div>');
      //            } else {
      //                $('body').append('<div id="' + finalid + '" class="error"><div></div><span class="arrow"></span></div>');
      //            }
    } else {
      $(finalid).css({ top: topOff + 'px', left: leftOff + 'px', width: width+'px' });
    }

    if (name === undefined) {
      console.log('please provide n attr');
      //                    if ($(element).attr('name') != undefined) {
      //                        name = $(element).attr('name');
      //                    }
    }


    var msg = '';
    if (name !== undefined) {
      if (tagname === 'SELECT' && error === 'e') {
        msg = 'please select ' + name + ' !';
      } else if (error === 'e') {
        msg = 'please enter ' + name + ' !';
      } else if (error === 'm' || error === 'no' || error === 'web') {
        msg = 'please enter valid ' + name + ' !';
      }
    } else {
      if (error === 'e') {
        msg = 'please enter value !';
      } else if (error === 'm') {
        msg = 'please enter valid Email!';
      } else if (error === 'no') {
        msg = 'please enter valid Mobile!';
      } else if (error === 'web') {
        msg = 'please enter valid Website !';
      }
    }
    $(finalid).find('div').html(msg);
    $(finalid).stop(true, true).fadeIn('1000').delay(DELAY).fadeOut('1000');
  };

  setInterval(function () {
    $('.htmlele').each(function () {
      $(this).html($(this).text()).removeClass('htmlele');
    });
  }, 2000);

  callfunction();
  $.fn.extend({
    fadeInFadeOut: function (speed, delay) {
      var current = 0;
      var thisEle = $(this);
      var total = $(this).children().length;
      $(this).find('div:gt(0)').hide();
      if (total > 1) {
        if (speed == undefined) {
          speed = '1000';
          delay = "4000";
        } else if (delay == undefined) {
          delay = "4000";
        }
        setInterval(function () {
          $(thisEle).children().eq(current).slideUp(speed, function () {
            if ((total - 1) == current) {
              current = 0;
              $(thisEle).children().eq(current).slideDown(speed);
            } else {
              $(this).next().slideDown(speed);
              current++;
            }
          });
        }, delay);
      }
    }, validate: function (ele, issubmit, delay, functionCallSuccess) {

      if (issubmit == undefined) {
        issubmit = false;
      }
      if (ele == undefined || ele == null) {
        ele = $(this).attr('tar');
      }
      if (delay == undefined) {
        delay = 2500;
      } else {
        DELAY = delay;
      }
      if (issubmit == false) {
        $(ele + ' input ,' + ele + ' textarea,' + ele + ' [validate],' + ele + ' select').not('eventbound').bind('blur', function () {
          $(this).addClass('eventbound');

          ISSUBMIT = false;
          var isAllValid = true;
          var tagname = $(this).prop('tagName');
          if ($(this).hasClass('e')) {
            isAllValid = $.fn.IsEmpty($(this).val(), $(this), tagname);
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'e', tagname);
            }
          }
          if ($(this).hasClass('m')) {
            isAllValid = $.fn.IsValidEmail($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'm');
            }
          }
          if ($(this).hasClass('no')) {
            isAllValid = $.fn.IsValidMoblieNo($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'no');
            }
          }
          if ($(this).hasClass('web')) {
            isAllValid = $.fn.IsValidWebsiteName($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'web');
            }
          }
          if (isAllValid === false) {
            return false;
          }
          //                    $('#' + $(this).attr('id') + 'error').fadeOut('1000', function () {
          //                        $(this).remove();
          //                    });
        });
        if (window.location.href.indexOf('localhost') != -1) {
          $(ele + ' input:text,' + ele + ' textarea,' + ele + ' [validate],' + ele + ' select').not('eventbound').each(function () {
            if ($(this).attr('id') == undefined) {
              $(this).after('<span class="col-md-12"   style="display:none;font-size: 10px;color: gray;">Please add id like id="uniqueid"</span>').next().stop(true, false).fadeTo('slow', '1');
            }
            if ($(this).attr('n') == undefined && $(this).attr('name') == undefined) {
              $(this).after('<span class="col-md-12"   style="display:none;font-size: 10px;color: gray;"> Please add n attribute like n="Title for message"</span>').next().stop(true, false).fadeTo('slow', '1');
            }
          });
        }
      }
      //            $(ele + ' input:text,' + ele + ' textarea,' + ele + ' [validate],' + ele + ' select').bind('focus', function () {
      //                $(this).attr('autocomplete', 'off');
      //                $('#' + $(this).attr('id') + 'error').fadeOut('1000');
      //            });
      if (issubmit || true) {
        ISSUBMIT = issubmit;

        var isAllValid = true;
        var arr = $(ele + ' input,' + ele + ' textarea,' + ele + ' [validate],' + ele + ' select');
        arr.each(function (index) {
          $(this).attr('autocomplete', 'off');
          if ($(this).hasClass('e')) {
            isAllValid = $.fn.IsEmpty($(this).val(), $(this));
            if (isAllValid == false) {

              $.fn.ShowMsg(this, 'e');
              $(this).focus();
              return false;
            }
          }
          if ($(this).hasClass('le') && index === (arr.length - 1)) {
            if (isAllValid) {
              isAllValid = $.fn.IsEmpty($(this).val());
              if (isAllValid == false) {
                $.fn.ShowMsg(this, 'e');
                $(this).focus();
                return false;
              }
            }
          }
          if ($(this).hasClass('m')) {
            isAllValid = $.fn.IsValidEmail($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'm');
              $(this).focus();
              return false;
            }
          }
          if ($(this).hasClass('em')) {
            if ($(this).val() !== '') {
              isAllValid = $.fn.IsValidEmail($(this).val());
              if (isAllValid == false) {
                $.fn.ShowMsg(this, 'm');
                $(this).focus();
                return false;
              }
            }
          }
          if ($(this).hasClass('no')) {
            isAllValid = $.fn.IsValidMoblieNo($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'no');
              $(this).focus();
              return false;
            }
          }
          if ($(this).hasClass('web')) {
            isAllValid = $.fn.IsValidWebsiteName($(this).val());
            if (isAllValid == false) {
              $.fn.ShowMsg(this, 'web');
              $(this).focus();
              return false;
            }
          }
          //                    $('#' + $(this).attr('id') + 'error').fadeOut('1000', function () {
          //                        $(this).remove();
          //                    });
        });
        if (functionCallSuccess === undefined) {
          return isAllValid;
        } else {
          if (isAllValid) {
            functionCallSuccess();
          }
          return false;
        }
      }


    }
  });

  $('#customdropdownmenu').click(function () {

    $(this).parent().addClass('open');
  })

  setTimeout(function () {
    $('.cls0').after('<div class="clearfix"></div>');
  }, 2000);
  var bottommenubar = $('#bottommenubar');

  $(window).scroll(function () {

    if ($(document).scrollTop() > 50) {
      bottommenubar.fadeOut('1000');
    } else {
      bottommenubar.fadeIn('1000');
    }

  });

  //custom control
  // $('.dtp').datetimepicker();
  //custom control

  var t = setInterval(function () {

    if ($('#loginnaukri').length > 0) {
      $('#loginnaukri').not('.done').attr('href', $('#loginnaukri').attr('href') + localStorage.getItem('Authkey'));
      $('#loginnaukri').addClass('done');
    }
  }, 2000);
  //help button
  if ($('#helpcontainer').length == 0) {
    $('body').append('<div id="helpcontainer" class="alert " style="padding:3px 13px; background:black; color:white; position:absolute; z-index:999999999999999999999999;box-shadow: 0 0 10px #0000006b;border: solid 1px white;border-radius: 13px; display:none; margin-top:-10px;"></div>');
  }
  //    $(document).delegate(".menu-toggle", "click", function (e) {
  //
  //        if ($(this).hasClass('minus'))
  //        {
  //            $(this).next().hide().removeClass('show-down');
  //            $(this).removeClass('minus');
  //        } else
  //        {
  //            $(this).next().slideDown().addClass('show-down');
  //            $(this).addClass('minus');
  //
  //        }
  //        $('.ml-menu.show-down').not($(this).next()).not($(this).parent().parent()).hide().removeClass('show-down').end().prev().removeClass('minus');
  //        $('.show-down').prev().addClass('minus');
  //    });

  $(document).delegate("[help]", "mousemove", function (e) {
    // $(this).addClass('text-danger');
    $('#helpcontainer').html($(this).attr('help'));
    //        $('#helpcontainer').animate({
    //            'left': e.pageX + 15 + 'px',
    //            'top': e.pageY + 15 + 'px'
    //
    //        }, 0);
    $('#helpcontainer').css('left', e.pageX + 15 + 'px').css('top', e.pageY + 15 + 'px');



  });
  $(document).delegate("[help]", "mouseenter", function (e) {

    $('#helpcontainer').stop(true, true).fadeIn('100');


  });
  $(document).delegate("[help]", "mouseleave", function (e) {

    $('#helpcontainer').stop(true, true).hide();


  });

  $(document).delegate("a:not([ng-click]),.showloader", "click", function (e) {

    $('.loading-spiner-holder').fadeIn(100, function () {
      $(this).hide('4000');
    });


  });
  $(document).delegate("a[href='#']", "click", function (e) {

    e.preventDefault();


  });


  //help button
});
