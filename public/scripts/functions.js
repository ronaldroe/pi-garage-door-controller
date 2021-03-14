export const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const createDoorStatusElements = (doors, doorImageSources) => {
  doors.doors.forEach(door => {
    let doorElement = document.createElement('div');
    doorElement.classList.add('door', doors.statuses[door.status]);
    doorElement.id = door.name;
    doorElement.setAttribute('data-door-id', door.id);

    let doorImg = document.createElement('img');
    doorImg.src = doorImageSources[doors.statuses[door.status]];
    doorElement.appendChild(doorImg);

    let doorButtons = document.createElement('div');
    doorButtons.classList.add('door-buttons');
    
    let doorUpButton = document.createElement('button');
    doorUpButton.classList.add('up');
    doorUpButton.type = 'button';
    doorUpButton.innerHTML = '⇧';
    doorButtons.appendChild(doorUpButton);

    let doorMoveButton = document.createElement('button');
    doorMoveButton.classList.add('move');
    doorMoveButton.type = 'button';
    doorMoveButton.innerHTML = '⇳';
    doorButtons.appendChild(doorMoveButton);

    let doorDownButton = document.createElement('button');
    doorDownButton.classList.add('move');
    doorDownButton.type = 'button';
    doorDownButton.innerHTML = '⇩';
    doorButtons.appendChild(doorDownButton);

    doorElement.appendChild(doorButtons);

    let doorStatus = document.createElement('div');
    doorStatus.classList.add('status');
    doorStatus.innerHTML = `${door.name}'s status is ${doors.statuses[door.status]}`;
    doorElement.appendChild(doorStatus);

    document.body.appendChild(doorElement);
  });
};