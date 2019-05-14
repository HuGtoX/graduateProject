(function(window){
	function Lyric(path){
		return new Lyric.prototype.init(path);
	}
	Lyric.prototype = {
		constructor:Lyric,
		init:function(path){
			this.path = path;
		},
		times:[],
		lyrics:[],
		index:-1,
		loadLyric:function(callBack){
			var $this = this;

			$.ajax({
				url:$this.path,

				dataType:"json",
				// contentType:"utf-8",
				success:function(data){ 
          
          if(!data.qfy){
            var data = data.lrc.lyric;
          }else{
            data = '纯音乐无歌词';
          }
          
					$this.parseLyric(data);
					callBack();
				},
				error:function(e){
					console.log(e);
					console.log(this.url);
				}
			});
		},
		parseLyric:function(data){
			var $this = this;
			//一定要清空上一首的歌词和时间
			$this.times = [];
			$this.lyrics = [];
			var array = data.split("\n");
			var timeReg = /\[(\d*:\d*\.\d*)\]/;
			//遍历每一条歌词
			$.each(array,function(index,ele){
				//处理歌词
				var lrc = ele.split("]")[1];
				//排除空字符串
				if(typeof lrc === "undefined") return true;
				if(lrc.length == 0) return true;

				console.log(typeof lrc);
				$this.lyrics.push(lrc);
				var res = timeReg.exec((ele));

				if(res == null) return true;
				var timeStr = res[1];
				var res2 = timeStr.split(":");
				var min = parseInt(res2[0]) * 60;
				var sec = parseFloat(res2[1]); 
				var time = parseFloat(Number(min + sec).toFixed(2));
				$this.times.push(time);

			});
		},
		currentTime:function(currentTime){
			var $this = this;
			if(currentTime>=$this.times[0]){
				$this.index++;
				$this.times.shift();
			}
			return $this.index;
		}
	}
	Lyric.prototype.init.prototype = Lyric.prototype;
	window.Lyric = Lyric;
})(window);