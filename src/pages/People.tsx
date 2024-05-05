import { useEffect, useState } from "react";

interface PeopleInfo {
    name: string;
    classification: string;
    role: string;
    link: string;
}

export function People() {
    const [contributors, setContributor] = useState<PeopleInfo[] | null>(null);

    useEffect(() => {
        async function getData() {
            const response = await fetch("/data/people.json");
            let data = await response.json();

            setContributor(data);
        }

        getData();
    }, []);

    // console.log(contributors);

    if (contributors == null) {
        return;
    }

    return (
        <>
            <div>
                <h1> Contributors </h1>
                <hr className="border-[3px] mb-3 border-red-800 rounded-md"/>
                <p> Following people have contributed ...</p>
            </div>
            

            <div className="my-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-8 mb-4 justify-items-center">
                    {contributors.map((people: PeopleInfo, index: number) => {
                        return <ContributorCard key={index} {...people} />;
                    })}
                </div>
            </div>
        </>
    );
}

function ContributorCard(data: PeopleInfo) {
    return (
        <>
            <div className="flex flex-col items-center m-5">
                <div className="picture">
                    <img src={`/people_imgs/${data.name.replace(/\s+/g, '')}.jpg`} />
                </div>
                <h3 className="text-xl font-medium my-2"> {data.name} </h3>
                <p className="text-[17px]"> {data.classification} </p>
                <p className="text-[17px] my-1"> {data.role} </p>

                <button
                    className="bg-red-800 mt-2 py-2 px-4 border-2 border-white text-white w-3/ rounded-md font-bold hover:bg-white hover:text-red-800 hover:border-2 hover:border-black" 
                    onClick={() => window.open(data.link, "_blank")}>
                    More Info
                </button>
            </div>
        </>
    );
}
