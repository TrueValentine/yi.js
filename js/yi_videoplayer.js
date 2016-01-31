$('document').ready(function(){
	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var colors = ["#C14DE3", "#EC7171", "#743EEE", "#49D967"];

	function getRandomColor(){
		return colors[getRandomInt(0, colors.length - 1)];
	}

	function Switch(data_yi_id, i){
		i++;
		var root = $('[data-yi-id=' + data_yi_id + ']');
		var video = root.children('video');
		var duration = video.get(0).duration;
		var volume = 0.1; // Default volume 10%
		var isPaused = true;
		var isMuted = false;
		var isFullscreen = false;
		var width = video.get(0).width;
		var height = video.get(0).height;

		video.after('<div id="yi_control_wrapper_'+i+'"></div>');
		var controller = root.children('#yi_control_wrapper_'+i);

		controller.append('<div id="yi_playpause_'+i+'"></div>');
		var playpause = controller.children('#yi_playpause_'+i);

		controller.append('<div id="yi_volumemute_'+i+'"></div>');
		var volumemute = controller.children('#yi_volumemute_'+i);

		controller.append('<div id="yi_timeline_'+i+'"></div>');
		var timeline = controller.children('#yi_timeline_'+i);

		timeline.append('<div class="yi_progress_'+i+'"></div>');
		var progress = timeline.children('.yi_progress_'+i);

		controller.append('<div id="yi_fullscreen_'+i+'"></div>');
		var fullscreen = controller.children('#yi_fullscreen_'+i);


		var controller_width = 'inherit';
		var controller_height = 50;
		var item_width = 50;
		var timeline_width = width-3*item_width-1;

		root.css({
			'background-color': 'black',
			'position': 'relative',
			'display': 'inline-block',
			'width': width,
			'height': height,
			'outline': '1px solid aqua'
		})

		video.css({
			'position': 'absolute'
		});

		controller.css({
			'position': 'absolute',
			'clear': 'both',
			'width': width,
			'bottom': 0,
			'height': controller_height,
			'width': controller_width,
			'background-color': getRandomColor(),
			'opacity': 0,
			'transition': 'opacity 0.12s linear'
		});

		playpause.css({
			'position': 'relative',
			'display': 'inline-block',
			'float': 'left',
			'height': 'inherit',
			'width': item_width,
			'background-image': 'url("img/svg/play.svg")',
			'background-repeat': 'no-repeat',
			'background-size': '50px 50px',
			'background-color': 'inherit'
		});

		volumemute.css({
			'position': 'relative',
			'display': 'inline-block',
			'float': 'left',
			'height': 'inherit',
			'width': item_width,
			'background-image': 'url("img/svg/volume-medium.svg")',
			'background-repeat': 'no-repeat',
			'background-size': '50px 50px',
			'background-color': 'inherit'
		});

		timeline.css({
			'position': 'relative',
			'display': 'inline-block',
			'float': 'left',
			'height': 'inherit',
			'width': timeline_width,
			'background-color': '#FFFFFF'
		});

		progress.css({
			'position': 'relative',
			'display': 'inline-block',
			'height': 'inherit',
			'width': '0',
			'background-color': '#000000',
			'transition': 'width 0.1s linear'
		});

		fullscreen.css({
			'position': 'relative',
			'display': 'inline-block',
			'float': 'right',
			'height': 'inherit',
			'width': item_width,
			'background-image': 'url("img/svg/enlarge.svg")',
			'background-repeat': 'no-repeat',
			'background-size': '50px 50px',
			'background-color': 'inherit'
		});

		//Set default options
		video.get(0).controls = false;
		video.get(0).volume = volume;

		controller.mouseover(function(){
			console.log('In');
			$( this ).css({
				'opacity': 0.75,
				'background-color': getRandomColor()
			})
		});

		controller.mouseout(function(){
			console.log('Out');
			$( this ).css({
				'opacity': 0
			})
		});

		//Hadlers
		function PlayPause(){
			if(isPaused){
				isPaused = false;
				video.get(0).play();
				$('#yi_playpause_'+i).css({
					'background-image': 'url("img/svg/pause.svg")'
				});
			}
			else{
				isPaused = true;
				video.get(0).pause();
				$('#yi_playpause_'+i).css({
					'background-image': 'url("img/svg/play.svg")'
				});
			}
		}

		function VolumeMute(){
			if(isMuted){
				isMuted = false;
				video.get(0).muted = isMuted;
				$('#yi_volumemute_'+i).css({
					'background-image': 'url("img/svg/volume-medium.svg")'
				});
			}
			else{
				isMuted = true;
				video.get(0).muted = isMuted;
				$('#yi_volumemute_'+i).css({
					'background-image': 'url("img/svg/volume-mute.svg")'
				});
			}
		}

			var elem = document.getElementById("ID");
			console.log(elem);
			console.log( $(video).get(0) );


		function Fullscreen(){
			var elem = $(video).get(0);
			if (elem.requestFullscreen){
				elem.requestFullscreen();
			}
			else if (elem.msRequestFullscreen){
				elem.msRequestFullscreen();
			}else if (elem.mozRequestFullScreen){
				elem.mozRequestFullScreen();
			}else if (elem.webkitRequestFullscreen){
				elem.webkitRequestFullscreen();
			}
		}

		function Progress(){
			var tmpWidth = 100*video.get(0).currentTime / this.duration;
			progress.css({
				'width': tmpWidth+'%'
			})
		}

		//Connections between events and handlers
		video.on('click', PlayPause);
		video.on('timeupdate', Progress);
		playpause.on('click', PlayPause);
		volumemute.on('click', VolumeMute);
		fullscreen.on('click', Fullscreen);
	}

	function Render(){
		var yi_videos = $(document).find('[data-yi-id]');
		for(var i = 0; i < yi_videos.length; i++){
			var tmpAttr = $(yi_videos[i]).attr('data-yi-id');
			// console.log(tmpAttr);
			Switch(tmpAttr, i);
		}
	}

	Render();
})