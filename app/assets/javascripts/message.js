$(function(){
  function buildHTML(message){
  // 「もしメッセージに画像が含まれていたら」という条件式
  if (message.image) {
    var html = `<p>  <div class="main_chat__message-list__message"> 
                       <div class="main_chat__message-list__message__info">
                         <div class="main_chat__message-list__message__info__user-name">
                           ${message.user_name}
                         </div>
                         <div class="main_chat__message-list__message__info__date">
                           ${message.created_at}
                         </div>
                       </div>
                       <div class="main_chat__message-list__message__text">
                         <p class="lower-message__content">${message.content}</p>
                         <img class= 'lower-message__image'>${message.image.url}
                       </div>
                     </div>
               </p>`
  } else {
    var html = `<P>  <div class="main_chat__message-list__message">
                      <div class="main_chat__message-list__message__info">
                        <div class="main_chat__message-list__message__info__user-name">
                          ${message.user_name}
                        </div>
                        <div class="main_chat__message-list__message__info__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="main_chat__message-list__message__text">
                        <p class="lower-message__content">${message.content}</p>
                      </div>
                     </div>  
               </p>`      
  }
  return html
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
  .done(function(data){
    var html = buildHTML(data);
    $('.main_chat__message-list').append(html);
    $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
    $('.new_message')[0].reset();
    $('.send__btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});