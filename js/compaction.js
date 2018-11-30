class Compaction {
    constructor(arr) {
        this.freeSpace = $('#compaction').find('.free-space span')[0];
        this.usedSpace = $('#compaction').find('.used-space span')[0];
        this.blockField = $('#compaction').find('input')[0];
        this.csv = $('#compaction').find('canvas')[0];
        this.ctx = this.csv.getContext("2d");
        this.data = [];
        this.compact = [0, 0, 0];
        for (var i=0, t=rand()%2; i<arr.length; ++i, t=++t%2)
        {
            this.data.push([arr[i], t]);
        }
        this.data.push([width, t%2]);
        for (var i=0, prev=0;i<this.data.length;++i)
        {
            this.compact[this.data[i][1]]+=(this.data[i][0]-prev);
            prev = this.data[i][0];
        }
        this.updateSpaces();
        this.render();
    }

    addBlock() {
        if (this.blockField.reportValidity()) {
            var size = 1*this.blockField.value;
            if (this.compact[1]>=size)
            {
                this.compact[1]-=size;
                this.compact[2]+=size;
                addMessage("compaction", "OK");
                this.updateSpaces();
                this.render();
                return;
            }
            addMessage("compaction", "Failed");
        }
    }


    render() {
        console.log(this.compact);
        this.ctx.clearRect(0, 0, width, height);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffa500";
        this.ctx.fillRect(0, 0, this.compact[0], heightOfBlock);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#e83e8c";
        this.ctx.fillRect(this.compact[0], 0, this.compact[2], heightOfBlock);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#007bff";
        this.ctx.fillRect(this.compact[2]+this.compact[0], 0, this.compact[1], heightOfBlock);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#007b5e";
        this.ctx.textAlign="center";
        this.ctx.font = "18px Arial";
        this.ctx.fillText(this.compact[0]+"KB", this.compact[0]/2, heightOfBlock+30);

        if (this.compact[2])
        {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#007b5e";
            this.ctx.textAlign="center";
            this.ctx.font = "18px Arial";
            this.ctx.fillText(this.compact[2]+"KB", this.compact[0] + this.compact[2]/2, heightOfBlock+30);
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = "#007b5e";
        this.ctx.textAlign="center";
        this.ctx.font = "18px Arial";
        this.ctx.fillText(this.compact[1]+"KB", this.compact[0] + this.compact[2] + this.compact[1]/2, heightOfBlock+30);


        return;
    }

    updateSpaces() {
        this.freeSpace.innerHTML = this.compact[1] + " KB";
        this.usedSpace.innerHTML = this.compact[0]+this.compact[2] + " KB";
    }

}
