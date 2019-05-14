(function(){
	function MvPlayer($audio){
		return MvPlayer.prototype.init($audio);
	}
	MvPlayer.prototype = {
		constructor:MvPlayer,
		init:function($audio){
			this.$audio = $audio;
			this.audio = $audio.get(0);
		},
		playVideo:function(){
			if(this.audio.paused){
				this.audio.play();
			}
			else{
				this.audio.pause();
			}
		},
		videoTimeUpdate:function(){
			var $this = this;
			this.$audio.on("timeupdate",function(){
				var duration = $this.audio.duration;
				var currentTime = $this.audio.currentTime;
				var timeStr = $this.formatDate(currentTime,duration);

				callBack(currentTime,duration,timeStr);
			})
		},
		formatDate:function(currentTime,duration){
			
			var endMin = parseInt(duration / 60); // 2
			var endSec = parseInt(duration % 60);
			if(endMin < 10){
				endMin = "0" + endMin;
			}
			if(endSec < 10){
				endSec = "0" + endSec;
			}

			var startMin = parseInt(currentTime / 60); // 2
			var startSec = parseInt(currentTime % 60);
			if(startMin < 10){
				startMin = "0" + startMin;
			}
			if(startSec < 10){
				startSec = "0" + startSec;
			}
			return startMin+":"+startSec+"/"+endMin+":"+endSec;
		},
	}
	
	MvPlayer.prototype.init.prototype = MvPlayer.prototype;
	window.MvPlayer = MvPlayer;

})(window)