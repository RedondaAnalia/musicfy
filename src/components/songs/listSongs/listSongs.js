import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

import './listSongs.scss';

export default function ListSongs(props) {


    const { songs, albumImage,playerSong } = props;


    return (
        <div>
             <Table inverted className="list-songs">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Titulo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {map(songs, item => (
                        <Song song={item} key={item.id} albumImage={albumImage} playerSong={playerSong} />
    ))}
                    
                </Table.Body>
            </Table>

            
        </div>
    )
}

function Song (props) {

    const { song, albumImage, playerSong } = props;

    const onPlay = () => {
        playerSong(albumImage, song.name, song.fileName);
    }

    return (       
    
        <Table.Row onClick={onPlay}>
            <Table.Cell collapsing>
                <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>
                {song.name}
            </Table.Cell>
        </Table.Row>

    )

}
