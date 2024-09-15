import React, { useState } from 'react';
import './Transcript.css';

interface TranscriptProps {
    transcript: string;
}

export const Transcript: React.FC<TranscriptProps> = ({transcript}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongTranscript = transcript.split('\n').length > 3;

    const formatTranscript = (transcript: string): string[] => {
        const lines = transcript.split('\n');
        return lines.map(line => {
            return line.replace(/[^a-zA-Z0-9 .,?:]/g, '');
        });
    };

    return (
        <div className="transcript-wrapper">
            <div className={`${isExpanded ? 'transcript-expanded' : 'transcript-collapsed'}`}>
                {formatTranscript(transcript).map((line, index) => <p key={index}>{line}</p>)}
            </div>
            {isLongTranscript &&
                <div className="btn-container">
                    <button className="button btn-primary" onClick={() => setIsExpanded(!isExpanded)}>
                        Show {isExpanded ? 'Less' : 'More'}
                    </button>
                </div>
            }
        </div>
    );
}
