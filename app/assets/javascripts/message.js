$(function(){

  function buildHTML(message){
  // 「もしメッセージに画像が含まれていたら」という条件式
  if (message.image) {
    var html = `<p>  <div class="main_chat__message-list__message" data-message-id="${message.id}"> 
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
                         <img class= "lower-message__image" src=${message.image} >  
                       </div>
                     </div>
               </p>`
  } else {
    var html = `<P>  <div class="main_chat__message-list__message" data-message-id="${message.id}">
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
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main_chat__message-list__message').last().data('message-id')
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      console.log("testtest");
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main_chat__message-list').append(insertHTML);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 7000);
});