

function box(){

    settings = document.getElementById('settings-box')

    named = document.createElement('text');
    named.className = 'setting-object'

    dimensionHeader = document.createElement('p');
    dimensionHeader.className = 'setting-header'
    heightYLabel = document.createElement('p');
    heightYLabel.className = 'setting-label'
    heightYLabel.innerHTML = 'Y'
    heightY = document.createElement('input');
    heightY.id = 'heightY'
    heightY.className = 'setting'
    heightY.type = 'number'
    widthXLabel = document.createElement('p');
    widthXLabel.className = 'setting-label'
    widthXLabel.innerHTML = 'X'
    widthX = document.createElement('input');
    widthX.id = 'widthX'
    widthX.className = 'setting'
    widthX.type = 'number'
    lengthZLabel = document.createElement('p');
    lengthZLabel.className = 'setting-label'
    lengthZLabel.innerHTML = 'Z'
    lengthZ = document.createElement('input');
    lengthZ.id = 'lengthZ'
    lengthZ.className = 'setting'
    lengthZ.type = 'number'

    positionHeader = document.createElement('p');
    positionHeader.className = 'setting-header'
    
    posYLabel = document.createElement('p');
    posYLabel.className = 'setting-label'
    posYLabel.innerHTML = 'Y'
    posY = document.createElement('input');
    posY.id = 'posY'
    posY.className = 'setting'
    posY.type = 'number'
    posXLabel = document.createElement('p');
    posXLabel.className = 'setting-label'
    posXLabel.innerHTML = 'X'
    posX = document.createElement('input');
    posX.id = 'posX'
    posX.className = 'setting'
    posX.type = 'number'
    posZLabel = document.createElement('p');
    posZ.id = 'posZ'
    posZLabel.className = 'setting-label'
    posZLabel.innerHTML = 'Z'
    posZ = document.createElement('input');
    posZ.className = 'setting'
    posZ.type = 'number'

    colorHeader = document.createElement('p');
    colorHeader.className = 'setting-header'
    color = document.createElement('input');
    color.id = 'color'
    color.type = 'color'
    color.className = 'setting'

    rotationHeader = document.createElement('p');
    rotationHeader.className = 'setting-header'
    rotYLabel = document.createElement('p');
    rotYLabel.className = 'setting-label'
    rotYLabel.innerHTML = 'Y'
    rotY = document.createElement('input');
    rotY.id = 'rotY'
    rotY.max = 360;
    rotY.min = 0;
    rotY.type = 'number'
    rotY.className = 'setting'
    rotXLabel = document.createElement('p');
    rotXLabel.className = 'setting-label'
    rotXLabel.innerHTML = 'X'
    rotX = document.createElement('input');
    rotX.id = 'rotX'
    rotX.max = 360;
    rotX.min = 0;
    rotX.type = 'number'
    rotX.className = 'setting'
    rotZLabel = document.createElement('p');
    rotZLabel.className = 'setting-label'
    rotZLabel.innerHTML = 'Z'
    rotZ = document.createElement('input');
    rotZ.id = 'rotZ'
    rotZ.max = 360;
    rotZ.min = 0;
    rotZ.type = 'number'
    rotZ.className = 'setting'


    settings.appendChild(named)


    settings.appendChild(positionHeader)

    settings.appendChild(posXLabel)
    settings.appendChild(posX)

    settings.appendChild(posYLabel)
    settings.appendChild(posY)

    settings.appendChild(posZLabel)
    settings.appendChild(posZ)


    settings.appendChild(dimensionHeader)

    settings.appendChild(widthXLabel)
    settings.appendChild(widthX)

    settings.appendChild(heightYLabel)
    settings.appendChild(heightY)

    settings.appendChild(lengthZLabel)
    settings.appendChild(lengthZ)


    settings.appendChild(rotationHeader)

    settings.appendChild(rotXLabel)
    settings.appendChild(rotX)
    
    settings.appendChild(rotYLabel)
    settings.appendChild(rotY)

    settings.appendChild(rotZLabel)
    settings.appendChild(rotZ)

    settings.appendChild(colorHeader)

    settings.appendChild(color)

}














