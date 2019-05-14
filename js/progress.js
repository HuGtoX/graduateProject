(function(window){
	function Progress($progressBar,$progressLine,$progressDot){
		return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
	}
	Progress.prototype = {
		constructor:Progress,
		musicList:[],
		init:function($progressBar,$progressLine,$progressDot){
			this.$progressBar = $progressBar;
			this.$progressLine = $progressLine;
			this.$progressDot = $progressDot;
		},
		isMove:false,
		progressClick:function(callBack){
			var $this = this; //此时此刻的this是progresss
			//监听背景的点击
			this.$progressBar.click(function(event){
        event.isPropagationStopped();
				//获取背景距离窗口默认的位置
				var normalLeft = $(this).offset().left;
				//获取点击位置距离窗口的位置
				var eventLeft = event.pageX;
				//设置前景的宽度
				$this.$progressLine.css("width",eventLeft - normalLeft);
				$this.$progressDot.css("left",eventLeft - normalLeft);

				//计算进度条比例
        var value = (eventLeft - normalLeft) / $(this).width();
        // console.log(value);
				callBack(value);
			});
		},
		progressClickY:function(callBack){
			var $this = this; //此时此刻的this是progresss
			//监听背景的点击
			
			this.$progressBar.click(function(event){
				//获取背景距离窗口默认的位置
				
				var normalTop = $(this).offset().top + $(this).height();

				//获取点击位置距离窗口的位置
				var eventTop = event.pageY;
				//设置前景的宽度
				var DotHeight = (normalTop - eventTop) - $this.$progressDot.height()/2 ;
				$this.$progressLine.css("height",normalTop - eventTop);
				$this.$progressDot.css("bottom",DotHeight);
				
				//计算进度条比例
				var value = (normalTop - eventTop) / $(this).height();
				callBack(value);
			});
		},
		progressMove:function(callBack){
			var $this = this;
			var progressBarWidth = $this.$progressBar.width();
			var normalLeft = this.$progressBar.offset().left;
			var eventLeft;
			// 1.监听鼠标的按下事件
			this.$progressBar.mousedown(function(){
				// 2.监听鼠标的移动事件
				$(document).mousemove(function(event){
					$this.isMove = true;
					eventLeft = event.pageX;
					var x = eventLeft - normalLeft;
					//设置前景的宽度
					if(x > progressBarWidth){
						x = progressBarWidth;
					}
					else if(x < 0){
						x = 0;
					}
					$this.$progressLine.css("width",x);
					$this.$progressDot.css("left",x);

					//拖动时禁止选中页面元素
					window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
					
				});
				$(document).mouseup(function(){
				$(document).off("mousemove");
				$this.isMove = false;
				var value = (eventLeft - normalLeft) / progressBarWidth;
				callBack(value);

				})
			});
				
		},
		progressMoveY:function(callBack){
			var $this = this;
			var progressBarHeight = $this.$progressBar.height();
			var normalTop = this.$progressBar.offset().top + progressBarHeight;
			var eventTop;
			// 1.监听鼠标的按下事件
			this.$progressBar.mousedown(function(){
				// 2.监听鼠标的移动事件
				$(document).mousemove(function(event){
					$this.isMove = true;
					eventTop = event.pageY;
					var x = normalTop - eventTop;
					//设置前景的宽度
					if(x > progressBarHeight){
						x = progressBarHeight;
					}
					else if(x < 0){
						x = 0;
					}
					var DotHeight = x - $this.$progressDot.height()/2 ;
					$this.$progressLine.css("height",x);
					$this.$progressDot.css("bottom",DotHeight);

					//拖动时禁止选中页面元素
					window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
					
				});
				$(document).mouseup(function(){
				$(document).off("mousemove");
				$this.isMove = false;
				var value = (normalTop - eventTop) / progressBarHeight;
				callBack(value);

				})
			});
				
		},
		initVoiceProgress:function(value){
			var s = this.$progressDot.height();
			if(this.isMove) return;
			if(value<0 || value>100) return;
			this.$progressLine.css({
				height:value + "%"
			});
			this.$progressDot.css({

				bottom:value - s + "%"
			});
		},
		setProgress:function(value){
			

			if(this.isMove) return;
			if(value<0 || value>100) return;
			this.$progressLine.css({
				width:value + "%"
			});
			this.$progressDot.css({

				left:value + "%"
			});
		}
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);