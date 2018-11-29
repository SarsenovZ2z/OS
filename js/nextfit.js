class Nextfit {
    constructor(arr) {
        this.freeSpace = $('#nextfit').find('.free-space span')[0];
        this.usedSpace = $('#nextfit').find('.used-space span')[0];
        this.blockField = $('#nextfit').find('input')[0];
        this.csv = $('#nextfit').find('canvas')[0];
        this.ctx = this.csv.getContext("2d");
        this.data = [];
        this.lastIteration = 0;
        for (var i=0, t=rand()%2; i<arr.length; ++i, t=++t%2)
        {
            this.data.push([arr[i], t]);
        }
        this.data.push([width, t%2]);
        this.updateSpaces();
        this.render();
    }

    addBlock() {
        if (this.blockField.reportValidity()) {
            var size = this.blockField.value;

            for (var i=this.lastIteration, prev=0;i<this.data.length;++i)
            {
                if (this.data[i][1]==1 && this.data[i][0]-prev>=size)
                {
                    
                    addMessage("nextfit", "OK");
                    this.updateSpaces();
                    this.render();
                    return;
                }
                prev = this.data[i][0];
            }


                    var old = freeBlocks[i][1]?this.data[freeBlocks[i][1]-1][0]:0;
                    if (freeBlocks[i][0]==size)
                    {
                        this.data.splice(freeBlocks[i][1], 1);
                    }
                    this.data.push([old+1*size, 2]);
                    this.data.sort(sortArr);
                    addMessage("nextfit", "OK");
                    this.updateSpaces();
                    this.render();
                    return;
                }
            }
            addMessage("nextfit", "Failed");
        }
    }


    render() {
        console.log(this.data);
        this.ctx.clearRect(0, 0, width, height);
        for(var i=0, prev=0, prevInd=0; i<this.data.length; ++i)
        {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.data[i][1]==1?"#007bff":this.data[i][1]==0?"#ffa500":"#e83e8c";
            this.ctx.fillRect(prev, 0, this.data[i][0], heightOfBlock);

            if (this.data[i][1]==1)
            {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#007b5e";
                this.ctx.textAlign="center";
                this.ctx.font = "18px Arial";
                this.ctx.fillText(this.data[i][0]-prev+"KB", this.data[i][0]-(this.data[i][0]-prev)/2, heightOfBlock+30);
            }
            else if (this.data[i][1]==2 && prevInd == 2)
            {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#fff";
                this.ctx.fillRect(prev-1, 0, 2, heightOfBlock);
            }
            prevInd = this.data[i][1];
            prev = this.data[i][0];
        }
    }

    updateSpaces() {
        var free = 0;
        for (var i=0, prev=0; i<this.data.length;++i)
        {
            if (this.data[i][1]==1)
            {
                free+=(this.data[i][0]-prev);
            }
            prev=this.data[i][0];
        }
        this.freeSpace.innerHTML = free + " KB";
        this.usedSpace.innerHTML = (width - free) + " KB";
    }

}
