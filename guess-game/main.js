var player;
var currentPlay = 0;
var currentPlayList=[];
var currentTopicNum=null;
let score=0;
var correctPosition=null;
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",{
        height:"0",
        width:"0",
        videoId:"s5d1XSwXmww",
        playerVars:{
            "autoplay":0,//不自動撥放
            "controls":0,//不顯示控制項
            "start":playTime[0],//起始秒數
            "end":playTime[1],//結束秒數
            "showinfo":0,
            "rel":0,
            "iv_load_policy":3
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}
function onPlayerReady(event){ 
   /* $("#playButton").click(function(){      
        player.playVideo();
    });*/ 
    console.log(player.getVolume());
   
}
function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())==playTime[1]){
        document.getElementById("music").style.animation="paused";
        document.getElementById("music").style.WebkitAnimation="paused";
    }
}
function loadId(vId){
    if(player){
        player.loadVideoById({
            "videoId": vId,
            "startSeconds":playTime[0],
            "endSeconds":playTime[1],
            "suggestedQuality":"large"
        });
        document.getElementById("music").style.animation="rotate1 3s linear  infinite";
        document.getElementById("music").style.WebkitAnimation="rotate1 3s linear  infinite";
    }    
}
function stopMusic(){
    player.stopVideo();
}
$(document).ready(function(){   
    let currentQuiz=null;
    $("#playMusic").toggle();
    $("#GuessButton").toggle();
    $("#chineseButton").click(function(){
        $("#optionToTopic").toggle();
        $("#GuessButton").toggle();
        currentTopicNum=0;
        let numberOfListItem = playList.chinese.length;
        for(let x=0;x<10;x++){
                let randomChildNumber = Math.floor(Math.random()*(numberOfListItem-1));
                currentPlayList.push(playList.chinese[randomChildNumber]);
                playList.chinese[randomChildNumber]=playList.chinese[numberOfListItem-x-1];
        } 
    });
    $("#koreaButton").click(function(){
        $("#optionToTopic").toggle();
        $("#GuessButton").toggle();
        currentTopicNum=1;
        let numberOfListItem = playList.korea.length;
        for(let x=0;x<10;x++){
                let randomChildNumber = Math.floor(Math.random()*(numberOfListItem-1));
                currentPlayList.push(playList.korea[randomChildNumber]);
                playList.korea[randomChildNumber]=playList.korea[numberOfListItem-x-1];
        } 
   
    });
    $("#englishButton").click(function(){
        $("#optionToTopic").toggle();
        $("#GuessButton").toggle();
        currentTopicNum=2;
        let numberOfListItem = playList.english.length;
        for(let x=0;x<10;x++){
                let randomChildNumber = Math.floor(Math.random()*(numberOfListItem-1));
                currentPlayList.push(playList.english[randomChildNumber]);
                playList.english[randomChildNumber]=playList.english[numberOfListItem-x-1];
        } 
    });
    $("#GuessButton").click(function(){        
        if(currentTopicNum==null){
            $("#home").toggle();
            $("#question").empty();
            $("#answers").empty(); 
            $("#answers").toggle(); 
            $("#optionToTopic").toggle();
            $("#GuessButton").attr("value","進入猜歌");
            $("#GuessButton").toggle();
        } 
        if(currentQuiz==null&&currentTopicNum!=null){  
            $("#playMusic").toggle();     
            $("#home").toggle();
            currentQuiz=0;                                                  
            currentPlay=currentQuiz;
            console.log(currentPlayList);
            loadId(currentPlayList[currentPlay][1]);            
            $("#question").text(currentQuiz+1);
            $("#answers").toggle();    
            let randomPostion=Math.floor(Math.random()*3);  
            correctPosition=randomPostion;
            for(let x=0;x<3;x++){
                if(x==randomPostion){
                    $("#answers").append(
                        "<input name='options' type='radio' value ="+"<label>"+currentPlayList[currentQuiz][0]+"</label><br><br>"
                    );
                }else{
                    let temp=null;     
                    $("#answers").append(
                        "<input name='options' type='radio' value="+"<label>"+currentPlayList[currentQuiz+x+1][0]+"</label><br><br>"
                    );
                }
            }          
            $("#GuessButton").attr("value","下一題");
        }else{
            $.each(
                $(":radio"),function(i,val){
                    if(val.checked){
                        if(i==correctPosition){
                            score++;
                        }
                        if(currentQuiz==currentPlayList.length-1){
                            stopMusic();
                            //final result
                            let finalResult = score;
                            score=0;
                            currentPlayList=[];
                            $("#question").text("最終成績");
                            $("#answers").empty();
                            $("#playMusic").toggle();
                            if(finalResult<5){
                                $("#answers").append("QQ~只有"+finalResult+"分,可以再繼續加油。");
                            }else if(finalResult==5){
                                $("#answers").append("恭喜獲得"+finalResult+"分!");
                            }else{
                                $("#answers").append("恭喜獲得"+finalResult+"分!你真是太厲害了!");
                            }                                     
                            currentQuiz=null;
                            currentTopicNum=null;
                            $("#GuessButton").attr("value","重新開始");                         
                        }else{
                            //not done
                            currentQuiz++;
                            currentPlay=currentQuiz;
                            loadId(currentPlayList[currentPlay][1]);
                            $("#question").text(currentQuiz+1);
                            $("#answers").empty();          
                            let randomPostion=Math.floor(Math.random()*3); 
                            correctPosition=randomPostion;
                            for(let x=0;x<3;x++){
                                if(x==randomPostion){
                                    $("#answers").append(
                                        "<input name='options' type='radio' value="+"<label>"+currentPlayList[currentQuiz][0]+"</label><br><br>"
                                    );
                                }else{       
                                    if(currentQuiz<5){
                                        $("#answers").append(
                                            "<input name='options' type='radio' value="+"<label>"+currentPlayList[currentQuiz+x+2][0]+"</label><br><br>"
                                        );
                                    }else{
                                        $("#answers").append(
                                            "<input name='options' type='radio' value="+"<label>"+currentPlayList[currentQuiz+x-3][0]+"</label><br><br>"
                                        );
                                    }
                                                               
                                }
                            }                                                        
                            $("#GuessButton").attr("value","下一題"); 

                        }
                        return false;
                    }
                }
            );  
        }      
    });
  
});