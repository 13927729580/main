		/**
		*���� begin
		**/
		var pageOf={
					"bannerInterval":10000
		}
		/**
		*���� end
		**/

		window.onload = function () {
				initClass.initBanner();
				initClass.initScrollPic();
		}
		window.onscroll = function (){
				toolsClass.logoOnscroll();
		}
		
		/**
		*ҳ�����
		**/
		var pageParams={
			"bannerIndex":1,     //��¼����banner�±�
			"logoChangeIntervalTime":20 //����logo����ʱ��
		}
		
		/**
		*��ʼ���� begin
		**/
		var initClass={
			 initBanner:function (){
				var bannerObj = banners[0];
				var urlName =  bannerObj.urlName;
				$("#banner").css("backgroundImage","url('index/img/bg/"+urlName+"')");
				$("#bannerTitle").html(bannerObj.title);
				$("#bannerText").html(bannerObj.text);
				setInterval("toolsClass.showBanner()",pageOf.bannerInterval);
			},
			initScrollPic:function(){
				toolsClass.appendTeamUser("teamUserUl");
				toolsClass.createScrollPic("scrollPic","LeftArr","RightArr");
			}
		}
		/**
		*��ʼ���� end
		**/
		
		/**
		*������ begin
		**/
		var toolsClass={
			showBanner:function (){
				var bannerObj = banners[pageParams.bannerIndex];
				var urlName =  bannerObj.urlName;
				$("#banner").css("backgroundImage","url('index/img/bg/"+urlName+"')");
				$("#bannerTitle").html(bannerObj.title);
				$("#bannerText").html(bannerObj.text);
				
				pageParams.bannerIndex++;
				if(pageParams.bannerIndex==banners.length){
					pageParams.bannerIndex=0;
				}
			},
			appendTeamUser:function(appendDivId){
					$.each(users,function(index,obj){
						var html='<li>'+
												 '<div class="teamDiv">'+
															'<div class="teamBodyDiv">'+
																'<div><img class="teamimg" src="index/img/team/'+obj.imgName+'" alt=""/></div>'+
																'<div class="teamUserName">'+obj.userName+'</div>'+
																'<div class="teamUserDesc">'+obj.userDesc+'</div>'+
															'</div>'+
															'<div><a href="https://github.com/'+obj.githubId+'"><img class="githubimg" src="index/img/logo/github.png"></img></a></div>'+
													'</div>'+
						            '</li>';
						$("#"+appendDivId).append(html);	
					})
				},
				createScrollPic:function(scrollContId,arrLeftId,arrRightId){
				    var scrollPic = new ScrollPic();
				    scrollPic.scrollContId   = scrollContId; //��������ID
				    scrollPic.arrLeftId      = arrLeftId;//���ͷID
				    scrollPic.arrRightId     = arrRightId; //�Ҽ�ͷID

				    scrollPic.frameWidth     = 800;//��ʾ����
				    //scrollPic.frameWidth     = document.body.clientWidth;
				    scrollPic.pageWidth      = 250; //��ҳ���

				    scrollPic.speed          = 10; //�ƶ��ٶ�(��λ���룬ԽСԽ��)
				    scrollPic.space          = 10; //ÿ���ƶ�����(��λpx��Խ��Խ��)
				    scrollPic.autoPlay       = false; //�Զ�����
				    scrollPic.autoPlayTime   = 300; //�Զ����ż��ʱ��(��)

				    scrollPic.initialize(); //��ʼ��
				}
				,logoOnscroll:function(){
					var stop = document.documentElement.scrollTop || document.body.scrollTop;		
					
					if( stop >= 30 && $("#headDown").is(':hidden')){
							$("#headDef").hide();
							$("#headDown").fadeIn("slow");
							setTimeout("toolsClass.logoChangeMin()",pageParams.logoChangeIntervalTime);
					}else if(stop < 30 && $("#headDef").is(':hidden')){	
							$("#headDef").show();
							$("#headDown").fadeOut("slow");
							setTimeout("toolsClass.logoChangeMax()",pageParams.logoChangeIntervalTime);
					}
				},
				logoChangeMin(){
					var width = $("#logoImg").width();
					if(width>55){
						$("#logoImg").width(width-5);
						setTimeout("toolsClass.logoChangeMin()",pageParams.logoChangeIntervalTime);
					}
				},
				logoChangeMax(){
					var width = $("#logoImg").width();
					if(width<=90){
						$("#logoImg").width(width+5);
						setTimeout("toolsClass.logoChangeMax()",pageParams.logoChangeIntervalTime);
					}
				},
				openDatasEjectDiv(){
					$("#showDatasEjectDiv").show();
					$("#showDatasEjectImg").show();
				},
				closeDatasEjectDiv(){
					$("#showDatasEjectDiv").hide();
					$("#showDatasEjectImg").hide();
				}
				
		}
		/**
		*������ end
		**/
			
			
		
		
		