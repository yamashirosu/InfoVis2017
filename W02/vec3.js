// Constructor
Vec3 = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}
// Add Method
Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

// Sum Method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

// min Method
Vec3.prototype.min = function()
{
    var min = this.x;
    if(min >= this.y)
    {
	min = this.y;
    }
    else if(min >= this.z)
    {
	min = this.z;
    }
    return min;
}

// mid Method
Vec3.prototype.mid = function()
{
    if(this.y <= this.x && this.x <= this.z )
    {
	return x;
    }
    if(this.x <= this.y && this.y <= this.z )
    {
	return y;
    }
    if(this.x <= this.z && this.z <= this.y )
    {
	return z;
    }
    if(this.z <= this.x && this.x <= this.y )
    {
	return x;
    }
    if(this.z <= this.y && this.y <= this.x )
    {
	return y;
    }
    if(this.y <= this.z && this.z <= this.x )
    {
	return z;
    }
    return 0;
}

// max Method
Vec3.prototype.max = function()
{
    var max = this.x;
    if(max <= this.y)
    {
	max = this.y;
    }
    else if(max <= this.z)
    {
	max = this.z;
    }
    return max;
}

