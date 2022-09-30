document.addEventListener('DOMContentLoaded' , function(){
    const content = this.querySelector('.content');
    const menu = this.querySelector('#menu');
    const tsCt = this.createElement('div');
    const tsTk = this.createElement('div');
    const ts = this.createElement('div');
    const tsDragBtn = this.createElement('div');
    const tsCtl = this.createElement('div');
    const tsCtlplay = this.createElement('i');
    const tsCtlforward = this.createElement('i');
    const tsCtlrewind = this.createElement('i');
    const tsCtS = tsCt.style;
    const tsTkS = tsTk.style;
    const tsS = ts.style;
    const tsDragBtnS = tsDragBtn.style;
    const tsCtlS = tsCtl.style;

    this.querySelector('main').appendChild(tsCt);
    tsCt.appendChild(tsTk);
    tsCt.appendChild(tsCtl);
    tsTk.appendChild(ts);
    tsTk.appendChild(tsDragBtn);
    tsCtl.appendChild(tsCtlrewind);
    tsCtl.appendChild(tsCtlplay);
    tsCtl.appendChild(tsCtlforward);

    tsCt.id = 'tsCt';
    tsTk.id = 'tsTk';
    ts.id = 'ts';
    tsDragBtn.id = 'tsDragBtn';
    tsCtl.id = 'tsCtl';
    tsCtlplay.className = 'icofont-play-alt-1 icofont-2x';
    tsCtlforward.className = 'icofont-forward icofont-2x';
    tsCtlrewind.className = 'icofont-rewind icofont-2x';
    
    tsCtS.zIndex = '2';
    tsCtS.left = '0';
    tsCtS.right = '300px';
    tsCtS.bottom = '0';
    tsCtS.height = '3em';
    tsCtS.position = 'fixed';
    tsCtS.display = 'flex';
    tsCtS.alignItems = 'center';
    tsCtS.background = 'rgba(255 , 255 , 255 , 0)';
    
    tsTkS.left = '20px';
    tsTkS.right = '150px';
    tsTkS.height = '10px';
    tsTkS.position = 'absolute';
    tsTkS.background = '#9da8b3';
    tsTkS.borderRadius = '5px';

    tsS.left = '0';
    tsS.top = '0';
    tsS.bottom = '0';
    tsS.width = '80%';
    tsS.position = 'absolute';
    tsS.background = '#197C9D';
    tsS.borderRadius = '5px';

    // tsDragBtn.draggable = 'true';
    tsDragBtnS.top = '-3px';
    tsDragBtnS.right = '-3px';
    tsDragBtnS.width = '16px';
    tsDragBtnS.height = '16px';
    tsDragBtnS.position = 'absolute';
    tsDragBtnS.background = '#197C9D';
    tsDragBtnS.borderRadius = '8px';
    tsDragBtnS.cursor = 'pointer';

    tsCtlS.right = '20px';
    tsCtlS.width = '110px';
    tsCtlS.height = '80%';
    tsCtlS.position = 'absolute';
    tsCtlS.display = 'flex';
    tsCtlS.justifyContent = 'center';
    tsCtlS.alignItems = 'center';

    tsCtl.querySelectorAll('i').forEach(icon => {
        icon.style.margin = '5px';
        icon.style.color = '#9da8b3';
        icon.style.backgroundColor = '#000';
        icon.style.borderRadius = '50%';
        icon.style.cursor = 'pointer';
    });

    tsTk.onmousedown = function(eo){
        
        tsDragBtnS.right = (tsDragBtn.getBoundingClientRect().left - eo.clientX) + 'px';
        console.log(tsDragBtn.getBoundingClientRect().left)
    };
});