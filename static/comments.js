'use strict';

// Static comments
// originally sourced from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
var addComment = function() {

  var select = function(s) {
    return document.querySelector(s);
  };

  var I = function(id) {
    return document.getElementById(id);
  };

  var submitButton = select("#comment-form-submit");

  var form = select('.js-form');
  form.doReset = function() {
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute("disabled", false)
    this.classList.remove('disabled');
    if (window.grecaptcha) {
      grecaptcha.reset()
    }
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    submitButton.innerHTML =
      '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Sending...'
    
    submitButton.setAttribute("disabled", true)

    var errorHandler = function(title, err) {
      console.log(err)
      var ecode = err.errorCode || "unknown";
      showModal('/images/cartoon_portrait_error.jpg', title, 'An error occured.<br>[' + ecode + ']');
      form.doReset()
    }

    form.classList.add('disabled');

    fetch(this.getAttribute('action'), {
      method: 'POST',
      body: new URLSearchParams(new FormData(this)),
      headers: new Headers({'content-type': 'application/x-www-form-urlencoded'})
    }).then(
      function (data) {
        if (data.ok) {
          showModal('/images/cartoon_portrait_success.jpg', 'Success!', "Thanks for the comment!  I'll post it on the page soon. - Jason");
          form.reset();
          form.doReset();
        } else {
          data.json().then(function(err) {
            errorHandler('Server Error', err);
          });
        }
      }
    ).catch(function (err) {
      console.error(err);
      errorHandler('Unexpected Error', err);
    });

  });

  select('.js-close-modal').addEventListener('click', function () {
    // select('body').classList.remove('show-modal');
    document.querySelector(".modal").style.display = "none"
    // submitButton.innerHTML =
    //   '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Sending...'
    // submitButton.setAttribute("disabled", true)
  });

  function showModal(img, title, message) {
    select('.modal-image').setAttribute("src", img)
    select('.js-modal-title').innerText = title
    select('.js-modal-text').innerHTML = message
    document.querySelector(".modal").style.display = ""
  }

  // Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
  // modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
  // Released under the GNU General Public License - https://wordpress.org/about/gpl/
  // addComment.moveForm is called from comment.html when the reply link is clicked.

  return {

    // commId - the id attribute of the comment replied to (e.g., "comment-10")
    // respondId - the string 'respond', I guess
    // parentUid - the UID of the parent comment
    moveForm: function(commId, respondId, parentUid, name) {
      var t           = this;
      var comm        = I( commId );                                // whole comment
      var respond     = I( respondId );                             // whole new comment form
      var cancel      = I( 'cancel-comment-reply-link' );           // whole reply cancel link
      var parentuidF  = I( 'comment-replying-to-uid' );             // a hidden element in the comment

      console.log(t)
      console.log(comm)
      console.log(respond)
      console.log(cancel)
      console.log(parentuidF)
      if ( ! comm || ! respond || ! cancel || ! parentuidF ) {
        console.log("TEST")
        return;
      }

      t.respondId = respondId;

      if ( ! I( 'sm-temp-form-div' ) ) {
        var div = document.createElement('div');
        div.id = 'sm-temp-form-div';
        div.style.display = 'none';
        respond.parentNode.insertBefore(div, respond); // create and insert a bookmark div right before comment form
      }

      let prevSibling = document.getElementById("comment-form").previousSibling
      if (prevSibling.classList.contains("comment-article")) {
        prevSibling.querySelector(".comment-reply-link").style.display = ""
      }
      comm.parentNode.insertBefore( respond, comm.nextSibling );  // move the form from the bottom to above the next sibling
      parentuidF.value = parentUid;
      cancel.style.display = '';                        // make the cancel link visible
      comm.querySelector(".comment-reply-link").style.display = "none"
      respond.querySelector("#comment-form-header").outerHTML = `<h3 id="comment-form-header">Reply to ${name}</h3>`
      respond.classList.add("nested")


      cancel.onclick = function() {
        var temp    = I( 'sm-temp-form-div' );            // temp is the original bookmark
        var respond = I( t.respondId );                   // respond is the comment form

        if ( !temp || !respond ) {
          return;
        }

        I('comment-replying-to-uid').value = null;
        temp.parentNode.insertBefore(respond, temp);  // move the comment form to its original location
        temp.parentNode.removeChild(temp);            // remove the bookmark div
        respond.querySelector("#comment-form-header").outerHTML = `<h2 id="comment-form-header">Leave a Comment</h2>`
        respond.classList.remove("nested")
        comm.querySelector(".comment-reply-link").style.display = ""
        this.style.display = 'none';                  // make the cancel link invisible
        this.onclick = null;                          // retire the onclick handler
        return false;
      };

      I('comment-form-message').focus();

      return false;
    }
  }
}();